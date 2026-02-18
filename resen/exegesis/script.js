let x, y, scheduled

legend.addEventListener('pointermove', event => {
    x = event.offsetX
    y = event.offsetY
    if (!scheduled) {
        scheduled = true
        requestAnimationFrame(() => {
            if (x != null) {
                legend.style.setProperty('--x', x + 'px')
                legend.style.setProperty('--y', y + 'px')
            }
            scheduled = false
        })
    }
})

function cancel() {
    x = y = null
    legend.style.removeProperty('--x')
    legend.style.removeProperty('--y')
}

legend.addEventListener('mouseleave', cancel)
addEventListener('blur', cancel)
addEventListener('fullscreenchange', cancel)
addEventListener('resize', cancel)
addEventListener('scroll', cancel)