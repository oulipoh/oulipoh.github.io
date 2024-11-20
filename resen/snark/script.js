const notes = {ABMH: 'C4 D4 E4 F4 E4 F4 F4 G4 G4 A4 F4 G4 G4 A4 G4 A4 A4 B4 A4 B4 B4 C5',
               ADWS: 'C4 B3 A3 G3 A3 G3 G3 F3 F3 E3 G3 F3 F3 E3 F3 E3 E3 D3 E3 D3 D3 C3'}

const keymap = {a: 'א',
                b: 'ב',
                v: 'ב',
                g: 'ג',
                d: 'ד',
                h: 'ה',
                w: 'ו',
                v: 'ו',
                z: 'ז',
                j: 'ח',
                y: 'ט',
                i: 'י',
                k: 'כ',
                'ך': 'כ',
                l: 'ל',
                m: 'מ',
                'ם': 'מ',
                n: 'נ',
                'ן': 'נ',
                s: 'ס',
                o: 'ע',
                e: 'ע',
                p: 'פ',
                f: 'פ',
                'ף': 'פ',
                c: 'צ',
                'ץ': 'צ',
                q: 'ק',
                r: 'ר',
                s: 'ש',
                t: 'ת'}

const duration_sec = .125
const reverb = new Tone.Reverb({decay: 15, wet: .6})
const style = getComputedStyle(document.body)
const synth = new Tone.Synth({oscillator: {type: 'sine'}, envelope: {attack: style.getPropertyValue('--active_transition_sec').slice(0, -1)}}).chain(reverb, Tone.Destination)
const delay_sec = style.getPropertyValue('--active_delay_sec').slice(0, -1)

function get_play(event) {
    const svg = event.currentTarget
    const circle = event.target
    let cls = ''
    if (navigator.userActivation.hasBeenActive && circle && circle.tagName.toLowerCase() == 'circle') {
        cls = [...circle.parentElement.classList].find(c => c.match(/^m\d+$/))
        const num = cls.slice(1)
        const path = [...svg.querySelectorAll(`.n${num}`)].map(node => [...node.classList].find(c => c.match(/^m\d+$/)).slice(1))
        path.reverse().push(num)
        const notes_array = notes[svg.id].split(' ')
        const seq = new Tone.Sequence((time, note) => synth.triggerAttackRelease(note, duration_sec, time), path.map(i => notes_array[i]), delay_sec).start('+.05')  // Reduce pops noise and avoid skipping first note. See: https://github.com/Tonejs/Tone.js/wiki/Performance#scheduling-in-advance and https://github.com/Tonejs/Tone.js/issues/403#issuecomment-447663104
	    seq.loop = false
        function mute() {
            seq.mute = true;
            circle.removeEventListener('click', mute)
            circle.removeEventListener('mouseleave', mute)
        }
	    circle.addEventListener('click', mute)
	    circle.addEventListener('mouseleave', mute)  // Will also fire when clicking outside for touch interaction
        Tone.Transport.start()
    }
    return [svg, cls]
}

function click(event) {
    const [svg, cls] = get_play(event)
    svg.dataset.selected = cls
}

document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || !event.key.match(/^[א-תa-zA-Z]$/) && event.key != 'Backspace' && event.key != 'CapsLock')
        return
    const svg = document.querySelector('svg')
    svg.style.setProperty('--delay', 0)
    const is_keyboard = svg.classList.contains('keyboard')
    svg.classList.remove('keyboard')
    setTimeout(() => {
        if (event.key == 'CapsLock') {
            svg.dataset.selected = ''
            if (is_keyboard)
                document.querySelectorAll('svg')[1].classList.add('keyboard')
            document.querySelectorAll('div[oncontextmenu*=toggle_fullscreen]').forEach((e, i) => e.appendChild(document.querySelectorAll('svg')[1 - i]))
        }
        else if (event.key != 'Backspace') {
            svg.classList.add('keyboard')
            const key = keymap[event.key.toLowerCase()] || event.key
            ;[...svg.querySelectorAll('circle')].find(c => c.nextElementSibling.textContent == key).dispatchEvent(new MouseEvent('click', {bubbles: true}))
        }
    }, 1)
})