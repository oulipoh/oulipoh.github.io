input.addEventListener('input', () => {
    if (input.value == 'לך לך') {
        if (input.previousElementSibling.id == 'last') {
            if (!input.classList.contains('last')) {
                input.classList.add('last')
                input.selectionEnd = 0
                input.maxLength = 10
                input.size = 10
                input.scrollIntoView(false)
            }
        } else {
            input.value = ''
            input.nextElementSibling.after(input)
            input.focus()
        }
    } else if (input.value == '     לך לך') {
        input.readOnly = true
        setTimeout(() => thepoem.scrollIntoView({behavior: 'smooth', block: 'end'}), 2000)
    }
})