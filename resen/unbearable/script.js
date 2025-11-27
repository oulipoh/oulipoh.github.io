input.addEventListener('input', () => {
    const next = input.nextElementSibling
    if (next && input.value == 'לך לך') {
        input.value = ''
        next.after(input)
        input.focus()
    } else if (!next && input.value == '     ') {
        input.readOnly = true
        input.value = '⁙'
        requestAnimationFrame(() => input.scrollIntoView({behavior: 'smooth', block: 'end'}))
    }
})