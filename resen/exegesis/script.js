let scheduled

legend.addEventListener('pointermove', event => {
    if (!scheduled) {
        scheduled = true
        requestAnimationFrame(() => {
            scheduled = false
            legend.style.setProperty('--x', event.clientX + 'px')
            legend.style.setProperty('--y', event.clientY + 'px')
        })
    }
})