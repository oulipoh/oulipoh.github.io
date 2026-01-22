let scheduled

addEventListener('pointermove', event => {
    if (!scheduled) {
        scheduled = true
        requestAnimationFrame(() => {
            scheduled = false
            const rect = legend.getBoundingClientRect()
            legend.style.setProperty('--x', (event.clientX - rect.x) + 'px')
            legend.style.setProperty('--y', (event.clientY - rect.y) + 'px')
        })
    }
})