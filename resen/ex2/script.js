let x, y, scheduled

legend.addEventListener('pointermove', event => {
    x = event.offsetX
    y = event.offsetY
    if (!scheduled) {
        scheduled = true
        requestAnimationFrame(() => {
            legend.style.setProperty('--x', x + 'px')
            legend.style.setProperty('--y', y + 'px')
            scheduled = false
        })
    }
})