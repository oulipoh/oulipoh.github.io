// From: Jos Faber, https://codepen.io/josfabre/pen/QWeVyKb

const n = 12
const width = 1400
const height = 60

let points = []
for (let i = 0; i <= n + 1; i++) {
    let x = width/n*i - 20 + Math.random()*40
    let y = 15 + Math.random()*20
    points.push({
        x,
        y,
        ox: x,
        oy: y,
        t: Math.random() * 2 * Math.PI,
        s: .05 + Math.random()*.15,
        factor: .4 + Math.random()*1.2
    })
}

const c = document.getElementById('canvas')
var ctx = c.getContext('2d')
c.width = Math.min(width, innerWidth)
c.height = height

const tick = () => {
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.beginPath()

    points.forEach((p, i) => {
        if (i > 0 || i < points.length - 1) {
            p.x = p.ox - 3 + Math.sin(p.t)*6
            p.y = p.oy + Math.cos(p.t)*8
        }

        p.s = {
            x:
                i
                    ? p.x - (p.x-points[i - 1].x)/2
                    : p.x - (points[i + 1].x-p.x)/2,
            y:
                i
                    ? p.y - (p.y-points[i - 1].y)/2
                    : points[i + 1].y - (points[i + 1].y-p.y)/2
        }

        p.e = {
            x:
                i == points.length - 1
                    ? p.x + (p.x-points[i - 1].x)/2
                    : points[i + 1].x - (points[i + 1].x-p.x)/2,
            y:
                i == points.length - 1
                    ? p.y - (points[i].y-points[i - 1].y)/2
                    : points[i + 1].y - (points[i + 1].y-p.y)/2
        }

        if (!i) {
            ctx.moveTo(p.s.x, p.s.y)
        }

        ctx.quadraticCurveTo(p.x, p.y, p.e.x, p.e.y)

        p.t += .015
    })

    ctx.lineWidth = 8
    ctx.strokeStyle = '#AFE1EF'
    ctx.stroke()

    ctx.lineTo(c.width + 50, 70)
    ctx.lineTo(-50, 70)
    ctx.lineTo(-50, points[0].y)

    ctx.closePath()
    ctx.fillStyle = '#B3E5FC'
    ctx.fill()

    requestAnimationFrame(tick)
}

tick()

new IntersectionObserver(e => {if (e[0].isIntersecting) filler.classList.add('grow')}).observe(document.querySelector('.refs'))
addEventListener('resize', () => c.width = Math.min(width, innerWidth))

const floatElements = document.querySelectorAll('h2, p, .refs, blockquote, footer > div')
new ResizeObserver(() => {
    const top = canvas.getBoundingClientRect().top
    floatElements.forEach(e => e.style.setProperty('--play', e.getBoundingClientRect().top - 40 > top ? 'running' : 'paused'))
}).observe(filler)