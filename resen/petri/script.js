const json_file = 'petri.json'
const grid_columns = 5
const halfstep_secs = .5
const restart_secs = 5
const fast = location.hash.slice(1) == 'fast'

const auto_vertical = true
const fix_above = true
const label_location = ''  // Can be: 'half' (half above and half below, favoring the below), 'above', or anything else to indicate below
const default_token_symbol = 'o'  // Cannot be of 1-9 or capital A-N
const arrow_width = 6
const arrow_height = 1
const comp_marking = 5

const lang = get_lang()
let global_reset_counter = 0;
document.addEventListener('keydown', e => global_reset_counter += is_key(e, 'Backspace'))

function compare_lists(a, b) {
    if (a.length != b.length)
        return a.length - b.length
    for (let i = 0; i < a.length; i++) {
        const diff = a[i] - b[i]
        if (diff)
            return diff
    }
    return 0
}

function sanitized_len(string, split=false) {
    string = string.replace(/[\u034f\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u200b-\u200f]|_.*/g, '')
    if (split)
        return Math.max(...string.split(' ').map(s => s.length))
    return string.length
}

const place_template = "\n   .-'''-.   \n \\ JD645CI / \n| NHB312AGM |\n / LF978EK \\ \n   `-...-`   \n"
const place_lines = place_template.trim().split('\n')
const place_width = Math.max(...place_lines.map(l => sanitized_len(l)))
const place_max_tokens = place_template.match(/[0-9A-Z]/g).length

function center(label, width, align_start=false) {
    return label.padEnd((width+sanitized_len(label)+align_start) / 2).padStart(width)
}

function trans_hor_symbol(label, len) {
    len = Math.max(len, place_width - 2)
    const shift = ' '.repeat(len % 2 == 0)
    return `${shift}.${'-'.repeat(len)}.\n${shift}|${center(label, len, !!lang)}|\n${shift}'${'-'.repeat(len)}'`
}

function trans_ver_symbol(label, len) {
    len = Math.max(len, place_lines.length - 2)
    label = label.split(' ').map(l => center(l, len))
    const border = '-'.repeat(label.length * 3)
    const shift = ' '.repeat(label.length % 2 == 0)
    const rows = [...label[0]].map((_, c) => label.map(row => row[c])).map(c => c.join('  ')).join(` |\n${shift}| `)
    return `${len % 2 ? '' : '\n'}${shift}.${border}.\n${shift}| ${rows} |\n${shift}'${border}'`
}

function place_symbol(label, num, above=false, token_symbol=default_token_symbol) {
    let symbol = place_template
    ;[...'123456789ABCDEFGHIJKLMN'].forEach((c, i) => symbol = symbol.replace(c, i < num ? token_symbol : ' '))
    if (above)
        return center(label, place_width, !!lang) + symbol + '\n'
    return symbol + center(label, place_width, !!lang)
}

function is_enabled(places, tokens) {
    tokens = {...tokens}
    for (const place of places) {
        if (!tokens[place])
            return false
        tokens[place]--
    }
    return true
}

function fire(grid, json, steps, max_tokens, result_counter, reset_counter, tokens, enabled) {
    const trans = enabled[Math.random() * enabled.length | 0]
    const elem = grid.querySelector(`[data-id="${trans}"]`)
    if (elem)
        elem.style.color = 'var(--firing)'
    json.transitions[trans][0].forEach(p => tokens[p]--)
    json.transitions[trans][1].forEach(p => tokens[p] = (tokens[p] || 0) + 1)
    setTimeout(step, halfstep_secs * 1000 * !fast, grid, json, steps, max_tokens, result_counter, reset_counter, tokens)
}

function max_len(transitions, labels, split=false) {
    if (!transitions)
        return 0
    return Math.max(...transitions.map(t => sanitized_len(lang && labels[t] ? labels[t] : t, split)))
}

function is_vertical(grid, trans) {
    return grid.querySelector(`[data-id="${trans}"]`)?.classList.contains('vertical')
}

function arrows(inside, outside, clue) {
    let arrow_body, inside_head, outside_head
    const is_hor = typeof clue === 'string'
    if (is_hor) {
        arrow_body = '-'.repeat(arrow_width - clue.split(' ').length*1.5)
        inside_head = '>'
        outside_head = '<'
    } else {
        arrow_body = '|'.repeat(arrow_height)
        inside_head = 'v'
        outside_head = '^'
    }
    let inside_arrow = arrow_body + inside_head + '\n'
    let outside_arrow = outside_head + arrow_body + '\n'
    if (outside < inside || outside % 2 && inside % 2 == 0 || clue == 1 && outside == inside)
        [inside, outside, inside_arrow, outside_arrow] = [outside, inside, outside_arrow, inside_arrow]
    const inside_top = inside / 2 | 0
    const outside_top = outside / 2 + .5 | 0
    let arrows = outside_arrow.repeat(outside_top) + inside_arrow.repeat(inside_top) + (is_hor && (inside+outside) % 2 == 0 ? '\n' : '') + inside_arrow.repeat(inside - inside_top) + outside_arrow.repeat(outside - outside_top)
    if (is_hor)
        return arrows
    arrows = arrows.trim().split('\n')
    return [...arrows[0]].map((_, c) => arrows.map(row => row[c])).map(c => c.join(' ')).join('\n')
}

function step(grid, json, steps=0, max_tokens={}, result_counter={}, reset_counter=0, tokens=null) {
    const comp = grid.parentElement.id
    const transitions = comp ? [comp] : Object.keys(json.transitions)
    if (tokens === null)
        tokens = comp ? Object.fromEntries(json.transitions[comp][0].map(p => [p, comp_marking])) : {...json.marking}

    const enabled = transitions.filter(t => is_enabled(json.transitions[t][0], tokens))
    const width = max_len(transitions.filter(t => !is_vertical(grid, t)), json.labels)
    const height = max_len(transitions.filter(t => is_vertical(grid, t)), json.labels, true)

    const long_arrows = []
    const elems = grid.querySelectorAll('pre')
    let cols = grid_columns
    if (comp)
        cols = elems.length
    cols = Math.min(cols, elems.length)
    elems.forEach((elem, index) => {
        let label = elem.dataset.id
        let alt = json.labels[elem.dataset.id]
        if (!comp || transitions.includes(elem.dataset.id)) {
            label = label.split('_')[0]
            alt = alt?.split('_')[0]
        } else {
            label = label.replace(/_/g, ' ')
            alt = alt?.replace(/_/g, ' ')
        }
        if (alt) {
            if (lang)
                [label, alt] = [alt, label]
            elem.title = alt
        }
        if (transitions.includes(elem.dataset.id)) {
            elem.textContent = is_vertical(grid, elem.dataset.id) ? trans_ver_symbol(label, height) : trans_hor_symbol(label, width)
            elem.style.color = enabled.includes(elem.dataset.id) ? 'var(--enabled)' : 'inherit'
            new Set(json.transitions[elem.dataset.id].slice(0, 2).flat()).forEach(place => {
                const inp = json.transitions[elem.dataset.id][0].filter(p => p == place).length
                const out = json.transitions[elem.dataset.id][1].filter(p => p == place).length
                const pelem = grid.querySelector(`[data-id="${place}"]`)
                if (inp + out)
                    if (is_vertical(grid, elem.dataset.id)) {
                        if (elem.previousSibling == pelem && index % cols)
                            elem.dataset.before = arrows(inp, out, label)
                        else if (elem.nextSibling == pelem && (index+1) % cols)
                            elem.dataset.after = arrows(out, inp, label)
                        else if (elem.parentElement.children[index - cols] == pelem)
                            elem.parentElement.children[index - cols].dataset.after = arrows(inp, out)
                        else if (elem.parentElement.children[index + cols] == pelem)
                            elem.parentElement.children[index + cols].dataset.before = arrows(out, inp, 1)
                        else
                            long_arrows.push([elem, pelem, inp, out])
                    } else if (!comp)
                        if (elem.previousSibling == pelem && index % cols)
                            elem.previousSibling.firstChild.dataset.after = arrows(inp, out, '')
                        else if (elem.nextSibling == pelem && (index+1) % cols)
                            elem.nextSibling.firstChild.dataset.before = arrows(out, inp, '')
                        else if (elem.parentElement.children[index - cols] == pelem)
                            elem.dataset.before = arrows(inp, out, 1)
                        else if (elem.parentElement.children[index + cols] == pelem)
                            elem.dataset.after = arrows(out, inp)
                        else
                            long_arrows.push([elem, pelem, inp, out])
            })
        } else {
            elem.firstChild.textContent = place_symbol(label, tokens[elem.dataset.id], elem.classList.contains('above'))
            if (!steps) {
                max_tokens[elem.dataset.id] ??= []
                max_tokens[elem.dataset.id].push(tokens[elem.dataset.id] || 0)
            }
            max_tokens[elem.dataset.id][max_tokens[elem.dataset.id].length - 1] = Math.max(max_tokens[elem.dataset.id][max_tokens[elem.dataset.id].length - 1], tokens[elem.dataset.id] || 0)
        }
    })

    if (reset_counter < global_reset_counter) {
        reset_counter = global_reset_counter
        max_tokens = Object.fromEntries(Object.entries(max_tokens).map(([p, counts]) => ([p, counts.slice(0, -1)])))
        step(grid, json, 0, max_tokens, result_counter, reset_counter)
    } else if (!enabled.length || comp && Object.values(tokens).some(n => n > place_max_tokens) || !comp && !json.require?.every(require => require.some(t => tokens[t]))) {
        const result = json?.require.map(side => side.some(p => tokens[p]) | 0)
        result_counter[result] = (result_counter[result] || []).concat(steps).sort((a, b) => a - b)
        if (!comp) {
            const all_steps = Object.values(result_counter).flat()
            const sides = result.map((_, i) => Object.entries(result_counter).filter(x => x[0].split(',')[i] == 1).map(x => x[1]).flat().length)
            const avg_tokens = Object.fromEntries(Object.entries(max_tokens).map(([p, counts]) => [p, counts.reduce((a, b) => a + b, 0) / counts.length]).sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0])))
            const sum = sides.reduce((a, b) => a + b, 0)
            console.log(all_steps.length, all_steps.reduce((a, b) => a + b, 0) / all_steps.length, sum ? sides[1] / sum : .5, avg_tokens, Object.fromEntries(Object.entries(result_counter).sort((a, b) => compare_lists(a[1], b[1]) || compare_lists(a[0], b[0]))))
        }
        setTimeout(step, restart_secs * 1000 * !fast, grid, json, 0, max_tokens, result_counter, reset_counter)
    } else
        setTimeout(fire, halfstep_secs * 1000 * !fast, grid, json, steps + 1, max_tokens, result_counter, reset_counter, tokens, enabled)
}

fetch(json_file).then(response => response.json()).then(json => {
    const all_labels = Object.keys(json.labels || {})
    const all_transitions = Object.keys(json.transitions)
    Object.values(json.transitions).map(v => v.slice(0, 2)).flat(2).forEach(place => {
        if (!all_labels.includes(place)) {
            console.warn(`Adding place ${place} found in transitions but missing from labels`)
            all_labels.push(place)
        }
    })

    document.querySelectorAll('.petri').forEach(elem => {
        const grid = elem.appendChild(document.createElement('div'))
        let transitions = all_transitions
        let labels = all_labels
        let cols = grid_columns
        if (elem.id) {
            transitions = [elem.id]
            labels = [...new Set([...json.transitions[elem.id][0], elem.id, ...json.transitions[elem.id][1]])]
            cols = labels.length
        }
        cols = Math.min(cols, labels.length)
        const rows = labels.length / cols | 0
        elem.style.setProperty('--cols', cols)
        let anti_above = []
        labels.forEach((label, index) => {
            const pre = document.createElement('pre')
            pre.dataset.id = label
            if (transitions.includes(label)) {
                if (json.vertical?.includes(label) || json.transitions[label][2] == 'vertical' || elem.id)
                    pre.classList.add('vertical')
                if (auto_vertical && !pre.classList.contains('vertical') || fix_above && !elem.id) {
                    let hor = ver = long = 0
                    let top_arrows = bottom_arrows = false
                    json.transitions[label].slice(0, 2).flat().forEach(place => {
                        const is_hor = index % cols && labels[index - 1] == place || (index+1) % cols && labels[index + 1] == place
                        hor += is_hor
                        const top_arrow = labels[index - cols] == place
                        top_arrows |= top_arrow
                        const bottom_arrow = labels[index + cols] == place
                        bottom_arrows |= bottom_arrow
                        const is_ver = top_arrow || bottom_arrow
                        ver += is_ver
                        if (!is_hor && !is_ver) {
                            place_index = labels.indexOf(place)
                            long += place_index % cols == 0 || (place_index+1) % cols == 0 || place_index / cols | 0 == 0 || place_index / cols | 0 == rows - 1
                        }
                    })
                    if (auto_vertical)
                        if ((index % cols == 0 || (index+1) % cols == 0) && index / cols | 0 && index / cols | 0 < rows - 1)
                            hor += long
                        else if ((index / cols | 0 == 0 || index / cols | 0 == rows - 1) && index % cols && index % cols < cols - 1)
                            ver += long
                        if (hor > ver)
                            pre.classList.add('vertical')
                    if (fix_above && pre.classList.contains('vertical')) {
                        if (top_arrows && !anti_above.includes(labels[index - cols]))
                            grid.children[index - cols].classList.add('above')
                        if (bottom_arrows)
                            anti_above.push(labels[index + cols])
                    }
                }
            } else {
                pre.classList.add('place')
                if (json.above?.includes(label) || !anti_above.includes(label) && (label_location == 'above' || label_location == 'half' && index < (labels.length/cols/2 | 0) * cols))
                    pre.classList.add('above')
            }
            const span = document.createElement('span')
            pre.appendChild(span)
            grid.appendChild(pre)
        })
        step(grid, json)
    })
})