const notes = {ABMH: 'C4 D4 E4 F4 E4 F4 F4 G4 G4 A4 F4 G4 G4 A4 G4 A4 A4 B4 A4 B4 B4 C5',
               ADWS: 'C4 B3 A3 G3 A3 G3 G3 F3 F3 E3 G3 F3 F3 E3 F3 E3 E3 D3 E3 D3 D3 C3'}

const keymap = {a: 'א',
                b: 'ב',
                g: 'ג',
                d: 'ד',
                h: 'ה',
                u: 'ו',
                w: 'ו',
                z: 'ז',
                j: 'ח',
                e: 'ט',
                i: 'י',
                y: 'י',
                k: 'כ',
                'ך': 'כ',
                l: 'ל',
                m: 'מ',
                'ם': 'מ',
                n: 'נ',
                'ן': 'נ',
                s: 'ס',
                o: 'ע',
                f: 'פ',
                p: 'פ',
                'ף': 'פ',
                c: 'צ',
                'ץ': 'צ',
                q: 'ק',
                r: 'ר',
                x: 'ש',
                t: 'ת'}

const duration_sec = .125
const style = getComputedStyle(document.body)
const delay_secs = style.getPropertyValue('--delay_secs').slice(0, -1)
const transition_secs = style.getPropertyValue('--transition_secs').slice(0, -1)
const reverb = new Tone.Reverb({decay: 15, wet: .6})
const synth = new Tone.Synth({oscillator: {type: 'sine'}, envelope: {attack: transition_secs}}).chain(reverb, Tone.Destination)

let reverb_ready
reverb.ready.then(() => reverb_ready = true)

function get_play(event, sticky) {
    const circle = event.target
    const svg = circle.parentElement?.parentElement
    if (circle.tagName.toLowerCase() != 'circle' || sticky && event.isTrusted && svg.classList.contains('keyboard'))
        return
    svg.classList.add('blink')
    requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.remove('blink')))
    if (sticky)
        svg.dataset.selected = circle.dataset.class
    else
        delete svg.dataset.selected

    if (navigator.userActivation.hasBeenActive && reverb_ready) {
        const seq = new Tone.Sequence((time, note) => synth.triggerAttackRelease(note, duration_sec, time), circle.dataset.path_notes.split(','), delay_secs).start('+.05')  // Reduce pops noise and avoid skipping first note. See: https://github.com/Tonejs/Tone.js/wiki/Performance#scheduling-in-advance and https://github.com/Tonejs/Tone.js/issues/403#issuecomment-447663104
        seq.loop = false

        function cancel(event) {
            seq.stop()
            seq.dispose()
            circle.removeEventListener('pointerdown', cancel)
            circle.removeEventListener('mouseleave', cancel)
        }

        circle.addEventListener('pointerdown', cancel)
        circle.addEventListener('mouseleave', cancel)  // Will also fire when clicking outside for touch interaction
        Tone.getTransport().start()
    }
}

const containers = document.querySelectorAll('.snark')
const touch = matchMedia('(hover: none)').matches
const circles = new Map()

if (touch)
    addEventListener('touchend', event => {
        if (navigator.userActivation.isActive)
            get_play(event, true)
    }, {once: true})

containers.forEach(elem => {
    elem.oncontextmenu = event => {
        if (event.target.tagName.toLowerCase() == 'circle')
            event.preventDefault()
        else
            toggle_fullscreen(event)
    }
    const svg = elem.firstElementChild

    svg.addEventListener('pointerdown', e => get_play(e, svg.classList.contains('keyboard') || touch && navigator.userActivation.hasBeenActive))
    if (!touch) {
        svg.addEventListener('mouseover', get_play)
        svg.addEventListener('mousemove', e => svg.classList.remove('keyboard'))
    }
    const notes_array = notes[svg.id].split(' ')
    circles.set(svg, {})
    svg.querySelectorAll('circle').forEach(circle => {
        circles.get(svg)[circle.nextElementSibling.textContent] = circle
        cls = circle.dataset.class = [...circle.parentElement.classList].find(c => c.match(/^m\d+$/))
        const num = cls.slice(1)
        const path = [...svg.querySelectorAll(`.n${num}`)].map(node => [...node.classList].find(c => c.match(/^m\d+$/)).slice(1))
        path.reverse().push(num)
        circle.dataset.path_notes = path.map(i => notes_array[i]).join()
    })
})

addEventListener('keydown', event => {
    if (event.altKey || event.getModifierState?.('AltGraph') || event.ctrlKey || event.metaKey || !event.key.match(/^[א-תa-zA-Z]$/) && event.key != 'Backspace' && (event.key != 'Tab' || event.shiftKey))
        return
    event.preventDefault()
    const current = +containers[1].classList.contains('fullscreen')
    const svg = containers[current].firstElementChild
    if (event.key == 'Backspace')
        delete svg.dataset.selected
    else if (event.key == 'Tab') {
        const svgs = document.querySelectorAll('svg')
        svgs.forEach(e => delete e.dataset.selected)
        containers.forEach((e, i) => e.appendChild(svgs[1 - i]))
    } else {
        const circle = circles.get(svg)[keymap[event.key.toLowerCase()] || event.key]
        if (circle) {
            svg.classList.add('keyboard')
            circle.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}))
        }
      }
})