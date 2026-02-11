const min_radius_frac = 5e-2
const dt_thresh = 100
const vel_thresh = 1e-5
const friction = 1e-3
let down, down_angle, prev_time

function cancel() {
    if (down) {
        down.style.setProperty('--down_cursor', '')
        down = null
    }
}

addEventListener('blur', cancel)
addEventListener('pointercancel', cancel)

addEventListener('pointerup', () => {
    if (down) {
        const time0 = performance.now()
        const spinner = down
        const style = getComputedStyle(spinner)
        const angle0 = +style.getPropertyValue('--angle')
        const vel0 = +style.getPropertyValue('--vel')
        cancel()

        function spin(time) {
            const vel = getComputedStyle(spinner).getPropertyValue('--vel') * Math.exp(-friction*(time-time0))
            if (Math.abs(vel) > vel_thresh) {
                spinner.style.setProperty('--angle', (angle0+(vel0-vel)/friction+1) % 1)
                requestAnimationFrame(spin)
            }
        }

        if (performance.now() - prev_time < dt_thresh)
            requestAnimationFrame(spin)
    }
})

function get_polar(x, y, elem) {
    const rect = elem.getBoundingClientRect()
    const center_x = rect.left + rect.width/2
    const center_y = rect.top + rect.height/2
    const delta_x = x - center_x
    const delta_y = y - center_y
    const r2 = delta_x**2 + delta_y**2
    const R2 = Math.min(rect.width, rect.height)**2 / 4
    if (r2 <= R2 && r2 > min_radius_frac**2 * R2)
        return Math.atan2(delta_y, delta_x) / 2 / Math.PI
    return null
}

const spins = document.querySelectorAll('.spin')

spins.forEach(elem => {
    elem.role = 'img'

    elem.addEventListener('contextmenu', event => {
        down_angle = get_polar(event.x, event.y, elem)
        if (down_angle == null)
            toggle_fullscreen(event)
        else
            event.preventDefault()
    })

    elem.addEventListener('pointerdown', event => {
        event.preventDefault()  // Prevent drag-and-drop
        down_angle = get_polar(event.x, event.y, elem)
        if (down_angle != null) {
            down = elem
            down.style.setProperty('--down_cursor', 'grabbing')
            down_angle -= getComputedStyle(down).getPropertyValue('--angle')
            down.style.setProperty('--vel', 0)
        }
    })
})

addEventListener('focus', () => dispatchEvent(new PointerEvent('pointermove')))

addEventListener('pointermove', event => {
    if (!down) {
        for (const spin of spins)
            spin.style.setProperty('--cursor', get_polar(event.x, event.y, spin) == null ? '' : 'grab')
        return
    }
    const new_angle = get_polar(event.x, event.y, down)
    if (new_angle == null) {
        down.style.setProperty('--down_cursor', '')
        down.style.setProperty('--cursor', '')
        down_angle = null
    } else {
        down.style.setProperty('--down_cursor', 'grabbing')
        down.style.setProperty('--cursor', 'grab')
        const angle = getComputedStyle(down).getPropertyValue('--angle')
        const new_time = performance.now()
        if (down_angle == null) {
            down_angle = new_angle - angle
            down.style.setProperty('--vel', 0)
        } else {
            const dt = new_time - prev_time
            if (dt)
                down.style.setProperty('--vel', ((new_angle-down_angle-angle+1.5)%1-.5) / dt)
            down.style.setProperty('--angle', (new_angle-down_angle+1) % 1)
        }
        prev_time = new_time
    }
})