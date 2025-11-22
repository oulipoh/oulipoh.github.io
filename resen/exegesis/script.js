legend.addEventListener('pointermove', event => {
    legend.style.setProperty('--x', event.clientX + 'px')
    legend.style.setProperty('--y', event.clientY + 'px')
})