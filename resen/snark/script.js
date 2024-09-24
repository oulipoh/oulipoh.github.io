const notes = {'ABMH': 'C4 D4 E4 F4 E4 F4 F4 G4 G4 A4 F4 G4 G4 A4 G4 A4 A4 B4 A4 B4 B4 C5',
               'ADWS': 'C4 B3 A3 G3 A3 G3 G3 F3 F3 E3 G3 F3 F3 E3 F3 E3 E3 D3 E3 D3 D3 C3'}

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
	    circle.addEventListener('mouseleave', () => seq.mute = true)  // Will also fire when clicking outside for touch interaction
        Tone.Transport.start()
    }
    return [svg, cls]
}

function click(event) {
    const [svg, cls] = get_play(event)
    svg.dataset.selected = cls
}