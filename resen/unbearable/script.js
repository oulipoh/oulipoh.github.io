input.addEventListener('input', () => {
    const next = input.nextElementSibling
    if (next && input.value == 'לך לך') {
        input.value = ''
        next.after(input)
        input.focus()
    } else if (!next && input.value == '     ') {
        input.value = '⁙'
        input.readOnly = true
        input.scrollIntoView({behavior: 'smooth', block: 'end'})
    }
})