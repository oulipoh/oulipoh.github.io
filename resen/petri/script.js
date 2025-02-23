const json_file = 'petri.json'
const grid_columns = 5
let halfstep_secs = .5
let restart_secs = 5
let stats = false
const hash = location.hash.slice(1)
if (hash == 'fast') {
    halfstep_secs = restart_secs = 0
    stats = true
} else if (hash == 'slow') {
    halfstep_secs = 3
    restart_secs = halfstep_secs * 3
} else if (hash.startsWith('full'))
    toggle_fullscreen(petri);  // works only in Firefox, after setting: full-screen-api.allow-trusted-requests-only = false

const auto_vertical = true
const label_location = 'half'  // Can be: 'half' (half above and half below, favoring the below), 'above', or anything else to indicate below
const default_token_symbol = 'o'  // Cannot be of 1-9 or capital A-N
const arrow_width = 4
const arrow_height = 1
const arrow_short_diag = 3
const short_diag_offset = 19
const leaderline_factor1 = .17
const leaderline_factor2 = .025
const leaderline_comp_offset = -40
const leaderline_comp_top = 20
const leaderline_comp_bottom = 90
const comp_marking = 5

let global_reset_counter = 0
document.addEventListener('keydown', e => global_reset_counter += is_shortcut(e, 'Backspace'))

const lang = get_lang()
const bc = new BroadcastChannel('bc')

function reset_poem() {
    if (typeof thepoem != 'undefined')
        thepoem.value = '\n'
    if (typeof bc != 'undefined')
        bc.postMessage('')
}

reset_poem()

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

function short_diag_arrows(ts, te, bs, be) {
    let arrow_ts, arrow_te, arrow_bs, arrow_be
    arrow_ts = arrow_te = arrow_bs = arrow_be = ' '.repeat(arrow_short_diag + 1)
    const slashes = '/'.repeat(arrow_short_diag)
    const backslashes = '\\'.repeat(arrow_short_diag)
    if (ts)
        arrow_ts = ts == 1 ? 'v' + slashes : slashes + '^'
    if (te)
        arrow_te = te == 1 ? 'v' + backslashes : backslashes + '^'
    if (bs)
        arrow_bs = bs == 1 ? '^' + backslashes : backslashes + 'v'
    if (be)
        arrow_be = be == 1 ? '^' + slashes : slashes + 'v'
    short_diags = Array(3).fill('')
    for (const i in arrow_ts) {
        const spaces = ' '.repeat(short_diag_offset + 2*i)
        short_diags = [arrow_ts[i] + spaces + arrow_te[i] , ...short_diags, arrow_bs[i] + spaces + arrow_be[i]]
    }
    return short_diags.join('\n')
}

function trans_hor_symbol(label, len) {
    len = Math.max(len, place_width - 2)
    const shift = ' '.repeat(len % 2 == 0)
    return `${shift}.${'-'.repeat(len)}.\n${shift}|${center(label, len, !!lang)}|\n${shift}'${'-'.repeat(len)}'`
}

function fix_lang_align(string) {
    return string.length == 1 || !lang ? string : string.match(/^( *)(.*?)( *)$/).slice(1).reverse().join('')
}

function trans_ver_symbol(label, len) {
    len = Math.max(len, place_lines.length - 2)
    if (label.length > len)
        label = label.split(' ')
    else
        label = [label]
    label = label.map(l => center(l, len))
    const border = '-'.repeat(label.length * 3)
    const shift = ' '.repeat(label.length % 2 == 0)
    const rows = [...label[0]].map((_, c) => label.map(row => row[c])).map(c => fix_lang_align(c.join('  '))).join(` |\n${shift}| `)
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

function add_prefixes(label, is_obj) {
    const sep = is_obj ? (lang ? null : ' ') : '_'
    const in_prefix = lang ? (is_obj && label != 'ISRAEL' && label != 'GAZA' ? 'IN THE ' : 'IN ') : 'ב'
    const article = lang ? 'THE ' : 'ה'
    return label.split(sep).map((w, i, arr) => ((i + !!is_obj) % 2 ? in_prefix : article) + w).join(' ')
}

function poem_generator(json, trans, place) {
    let verbs, verb, dobj
    if (lang) {
        trans = json.full_labels[trans] || trans
        place = json.labels[place] || place
        verbs = ['BOOSTED', 'ENHANCED', 'FORTIFIED', 'INCREASED', 'STRENGTHENED']
        verb = verbs[Math.random() * verbs.length | 0]
        dobj = 'THE RESILIENCE'
        place = place.startsWith('ENMITY') ? 'OF THE ' + place : add_prefixes(place, true)
    } else {
        verbs = ['ביצר', 'הגביר', 'הגדיל', 'העצים', 'חיזק']
        verb = verbs[Math.random() * verbs.length | 0]
        if (trans.match(/ה($| |_)/))
            verb = verb.replace(/ם$/, 'מ') + 'ה'
        dobj = 'את החוסן'
        place = place.startsWith('איבה') ? 'של ה' + place : add_prefixes(place, true)
    }
    return [add_prefixes(trans), verb, dobj, place].join(' ')
}

function fire(grid, json, steps, max_tokens, result_counter, reset_counter, tokens, enabled, comp) {
    let trans = enabled[Math.random() * enabled.length | 0]
    grid.querySelectorAll('pre').forEach(e => e.style.color = e.dataset.id == trans ? 'var(--firing)' : '')
    const inp = json.transitions[trans][0]
    const out = json.transitions[trans][1]
    inp.forEach(p => tokens[p]--)
    out.forEach(p => tokens[p] = (tokens[p] || 0) + 1)
    if (!comp) {
        const verse = poem_generator(json, trans, out[Math.random() * out.length | 0])
        if (typeof thepoem != 'undefined')
            textarea_writeln(thepoem, verse)
        if (typeof bc != 'undefined')
            bc.postMessage(verse)
    }
    setTimeout(step, halfstep_secs * 1000, grid, json, steps, max_tokens, result_counter, reset_counter, tokens)
}

function max_len(transitions, labels, split=false) {
    return Math.max(...transitions.map(t => sanitized_len(lang && labels[t] ? labels[t] : t, split)), 0)
}

function is_vertical(grid, trans) {
    return grid.querySelector(`[data-id="${trans}"]`)?.classList.contains('vertical')
}

function arrows(inside, outside, clue) {
    let arrow_body, inside_head, outside_head
    const is_hor = typeof clue == 'string'
    if (is_hor) {
        arrow_body = '-'.repeat(arrow_width + 2 - clue.split(' ').length*1.5)
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
    let result_arrows = outside_arrow.repeat(outside_top) + inside_arrow.repeat(inside_top) + (is_hor && (inside+outside) % 2 == 0 ? '\n' : '') + inside_arrow.repeat(inside - inside_top) + outside_arrow.repeat(outside - outside_top)
    if (is_hor)
        return result_arrows
    result_arrows = result_arrows.trim().split('\n')
    return [...result_arrows[0]].map((_, c) => result_arrows.map(row => row[c])).map(c => c.join(' ')).join('\n')
}

function step(grid, json, steps=0, max_tokens={}, result_counter={}, reset_counter=0, tokens) {
    let comp
    if (grid.parentElement.id in json.transitions)
        comp = grid.parentElement.id
    const transitions = comp ? [comp] : Object.keys(json.transitions)
    if (tokens == undefined)
        tokens = comp ? Object.fromEntries(json.transitions[comp][0].map(p => [p, comp_marking])) : {...json.marking}
    grid.querySelectorAll('[data-clicks]').forEach(place => {
        const clicks = place.dataset.clicks | 0
        place.removeAttribute('data-clicks')
        tokens[place.dataset.id] = (tokens[place.dataset.id] || 0) + clicks
    })

    const enabled = transitions.filter(t => is_enabled(json.transitions[t][0], tokens))
    const width = max_len(transitions.filter(t => !is_vertical(grid, t)), json.labels)
    const height = max_len(transitions.filter(t => is_vertical(grid, t)), json.labels, true)

    const missing_arrows = []
    const elems = [...grid.querySelectorAll('pre')]
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
            elem.style.color = enabled.includes(elem.dataset.id) ? 'var(--enabled)' : ''
            let ts, te, bs, be
            ts = te = bs = be = 0
            new Set(json.transitions[elem.dataset.id].slice(0, 2).flat()).forEach(place => {
                elem.firstChild.textContent = is_vertical(grid, elem.dataset.id) ? trans_ver_symbol(label, height) : trans_hor_symbol(label, width)
                const inp = json.transitions[elem.dataset.id][0].filter(p => p == place).length
                const out = json.transitions[elem.dataset.id][1].filter(p => p == place).length
                const pelem = grid.querySelector(`[data-id="${place}"]`)
                if (inp + out)
                    if (elems[index - cols - 1] == pelem && index % cols && inp + out == 1)
                        ts = inp ? 1 : -1
                    else if (elems[index - cols + 1] == pelem && (index+1) % cols && inp + out == 1)
                        te = inp ? 1 : -1
                    else if (elems[index + cols - 1] == pelem && index % cols && inp + out == 1)
                        bs = inp ? 1 : -1
                    else if (elems[index + cols + 1] == pelem && (index+1) % cols && inp + out == 1)
                        be = inp ? 1 : -1
                    else if (is_vertical(grid, elem.dataset.id)) {
                        if (elem.previousSibling == pelem && index % cols)
                            elem.dataset.before = arrows(inp, out, label)
                        else if (elem.nextSibling == pelem && (index+1) % cols)
                            elem.dataset.after = arrows(out, inp, label)
                        else if (elems[index - cols] == pelem)
                            elems[index - cols].dataset.after = arrows(inp, out)
                        else if (elems[index + cols] == pelem)
                            elems[index + cols].dataset.before = arrows(out, inp, 1)
                        else
                            missing_arrows.push([elem, pelem, inp, out])
                    } else if (!comp)
                        if (elem.previousSibling == pelem && index % cols)
                            elem.previousSibling.firstChild.dataset.after = arrows(inp, out, '')
                        else if (elem.nextSibling == pelem && (index+1) % cols)
                            elem.nextSibling.firstChild.dataset.before = arrows(out, inp, '')
                        else if (elems[index - cols] == pelem)
                            elem.dataset.before = arrows(inp, out, 1)
                        else if (elems[index + cols] == pelem)
                            elem.dataset.after = arrows(out, inp)
                        else
                            missing_arrows.push([elem, pelem, inp, out])
            })
            if (ts || te || bs || be)
                elem.firstChild.dataset.before = short_diag_arrows(ts, te, bs, be)
        } else {
            elem.firstChild.textContent = place_symbol(label, tokens[elem.dataset.id], elem.classList.contains('above'))
            if (!steps) {
                max_tokens[elem.dataset.id] ??= []
                max_tokens[elem.dataset.id].push(tokens[elem.dataset.id] || 0)
            }
            max_tokens[elem.dataset.id][max_tokens[elem.dataset.id].length - 1] = Math.max(max_tokens[elem.dataset.id][max_tokens[elem.dataset.id].length - 1], tokens[elem.dataset.id] || 0)
        }
    })

    if (!grid.querySelector('.leader-line')) {
        const leaderline_options = {color: getComputedStyle(grid.parentElement).getPropertyValue('--fg'), dash: {len: 15, gap: 10}, endPlug: 'arrow2', endPlugSize: 2, path: 'straight', size: 1}
        if (comp)
            leaderline_options.path = 'bilinear'
        missing_arrows.forEach(([telem, pelem, inp, out]) => {
            const tindex = elems.indexOf(telem)
            const pindex = elems.indexOf(pelem)
            const trow = tindex / cols | 0
            const tcol = tindex % cols
            const prow = pindex / cols | 0
            const pcol = pindex % cols
            let y1 = leaderline_comp_top
            let y2 = leaderline_comp_top
            let x1 = (pcol-tcol)
            let x2 = (tcol-pcol)
            if (comp) {
                leaderline_options.startSocketGravity = leaderline_comp_offset
                if (Math.abs(x1) > 2 && Math.abs(x1) % 2) {
                    leaderline_options.startSocketGravity *= -1
                    y1 = y2 = leaderline_comp_bottom
                }
                x1 = Math.sign(x1)
                x2 = Math.sign(x2)
            } else {
                y1 = 50 + (trow-prow)*leaderline_factor1*100
                y2 = 50 + (prow-trow)*leaderline_factor1*100
            }
            x1 = x1*leaderline_factor1*100 + 50
            x2 = x2*leaderline_factor1*100 + 50
            const dy = Math.abs(pcol-tcol) * leaderline_factor2 * 100
            const dx = (prow-trow) * Math.sign(pcol - tcol) * leaderline_factor2 * 100
            const c = (inp + out - 1) / 2
            for (let i = 0; i < inp; i++)
                new LeaderLine(LeaderLine.pointAnchor(pelem, {x: x1 + (i-c)*dx + '%', y: y1 + (i-c)*dy + '%'}), LeaderLine.pointAnchor(telem, {x: x2 + (i-c)*dx + '%', y: y2 + (i-c)*dy + '%'}), leaderline_options)
            for (let i = inp; i < inp + out; i++)
                new LeaderLine(LeaderLine.pointAnchor(telem, {x: x2 + (i-c)*dx + '%', y: y2 + (i-c)*dy + '%'}), LeaderLine.pointAnchor(pelem, {x: x1 + (i-c)*dx + '%', y: y1 + (i-c)*dy + '%'}), leaderline_options)
        })
    }

    if (reset_counter < global_reset_counter) {
        reset_counter = global_reset_counter
        if (!comp)
            reset_poem()
        max_tokens = Object.fromEntries(Object.entries(max_tokens).map(([p, counts]) => ([p, counts.slice(0, -1)])))
        step(grid, json, 0, max_tokens, result_counter, reset_counter)
    } else if (!enabled.length || comp && Object.values(tokens).some(n => n > place_max_tokens) || !comp && !json.require?.every(require => require.some(t => tokens[t]))) {
        if (!comp) {
            if (typeof thepoem != 'undefined')
                textarea_writeln(thepoem)
            if (typeof bc != 'undefined')
                bc.postMessage('\n')
            if (stats) {
                const result = json.require?.map(side => side.some(p => tokens[p]) | 0)
                result_counter[result] = (result_counter[result] || []).concat(steps).sort((a, b) => a - b)
                const all_steps = Object.values(result_counter).flat()
                const sides = result?.map((_, i) => Object.entries(result_counter).filter(x => x[0].split(',')[i] == 1).map(x => x[1]).flat().length)
                const avg_tokens = Object.fromEntries(Object.entries(max_tokens).map(([p, counts]) => [p, counts.reduce((a, b) => a + b) / counts.length]).sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0])))
                const sum = sides?.reduce((a, b) => a + b, 0)
                console.log(all_steps.length, all_steps.reduce((a, b) => a + b) / all_steps.length, sum ? sides[1] / sum : .5, avg_tokens, Object.fromEntries(Object.entries(result_counter).sort((a, b) => compare_lists(a[1], b[1]) || compare_lists(a[0], b[0]))))
            }
        }
        setTimeout(step, restart_secs * 1000, grid, json, 0, max_tokens, result_counter, reset_counter)
    } else
        setTimeout(fire, halfstep_secs * 1000, grid, json, steps + 1, max_tokens, result_counter, reset_counter, tokens, enabled, comp)
}

fetch(json_file).then(response => response.json()).then(json => {
    json.labels ??= {}
    json.full_labels = {...json.labels}
    const all_labels = Object.keys(json.labels)
    const all_transitions = Object.keys(json.transitions)
    Object.entries(json.transitions).map(l => l.flat().slice(0, 3)).flat(2).forEach(label => {
        if (!all_labels.includes(label)) {
            console.warn(`Adding label ${label} found in transitions but missing from labels`)
            all_labels.push(label)
        }
    })

    document.querySelectorAll('.petri').forEach(elem => {
        const grid = elem.appendChild(document.createElement('div'))
        grid.className = 'leader-line-container'
        let transitions = all_transitions
        let labels = all_labels
        let cols = grid_columns
        if (elem.id in json.transitions) {
            transitions = [elem.id]
            labels = [...new Set([...json.transitions[elem.id][0], elem.id, ...json.transitions[elem.id][1]])]
            cols = labels.length
        }
        cols = Math.min(cols, labels.length)
        elem.style.setProperty('--cols', cols)
        labels.forEach((label, index) => {
            const pre = grid.appendChild(document.createElement('pre'))
            pre.dataset.id = label
            if (transitions.includes(label)) {
                if (json.vertical?.includes(label) || json.transitions[label][2] == 'vertical' || elem.id in json.transitions)
                    pre.className = 'vertical'
                if (auto_vertical && !(elem.id in json.transitions)) {
                    let hor = 0
                    let ver = 0
                    json.transitions[label].slice(0, 2).flat().forEach(place => {
                        const pindex = labels.indexOf(place)
                        const trow = index / cols | 0
                        const tcol = index % cols
                        const prow = pindex / cols | 0
                        const pcol = pindex % cols
                        hor += Math.abs(trow - prow) < Math.abs(tcol - pcol)
                        ver += Math.abs(trow - prow) > Math.abs(tcol - pcol)
                    })
                    if (hor > ver)
                        pre.className = 'vertical'
                }
                if (json.labels[label]?.includes('|')) {
                    const forms = json.labels[label].split('|')
                    json.full_labels[label] = forms[0]
                    json.labels[label] = forms[pre.classList.contains('vertical') | 0]
                }
            } else {
                pre.className = 'place'
                pre.addEventListener('click', () => pre.dataset.clicks = (pre.dataset.clicks | 0) + 1)
                if (!(elem.id in json.transitions) && (json.above?.includes(label) || label_location == 'above' || label_location == 'half' && index < (labels.length/cols/2 | 0) * cols))
                    pre.classList.add('above')
            }
            pre.appendChild(document.createElement('span'))
        })
        elem.style.background = 'var(--bg)'
        step(grid, json)
    })
})