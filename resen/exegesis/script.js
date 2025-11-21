const all_images = [side, legend, bottom, right]
all_images.forEach(j => j.addEventListener('click', event => {
    all_images.forEach(i => {
        i.classList.toggle('show', i == event.currentTarget && !i.classList.contains('show'))
        i.classList.toggle('hide', i != event.currentTarget && !i.classList.contains('hide')) 
    })
    if (event.currentTarget.classList.contains('show'))
        event.currentTarget.scrollIntoView()
    else
        event.currentTarget.parentElement.scrollIntoView()
}))
addEventListener('keydown', e => {if (e.key == 'Escape') all_images.forEach(i => i.classList.remove('show', 'hide'))})
legend.addEventListener('pointermove', event => {
    legend.style.setProperty('--x', event.offsetX + 'px')
    legend.style.setProperty('--y', event.offsetY + 'px')
    legend.style.setProperty('--r', event.target.clientHeight*.1 + 'px')
})