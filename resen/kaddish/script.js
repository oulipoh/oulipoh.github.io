const kaddish = `
יִתְגַּדַּל וְיִתְקַדַּשׁ שְׁמֵהּ רַבָּא.
בְּעָלְמָא דִי בְרָא כִרְעוּתֵהּ וְיַמְלִיךְ מַלְכוּתֵהּ,
וְיַצְמַח פּוּרְקָנֵהּ וִיקָרֵב מְשִׁיחֵהּ.
בְּחַיֵיכוֹן וּבְיוֹמֵיכוֹן וּבְחַיֵי דְּכָל בֵּית
יִשְׂרָאֵל, בַּעֲגַלָא וּבִזְמַן קָרִיב וְאִמְרוּ אָמֵן.
יְהֵא שְׁמֵהּ רַבָּא מְבָרַךְ לְעָלַם וּלְעָלְמֵי
עָלְמַיָּא.
יְהֵא שְׁמֵהּ רַבָּא מְבָרַךְ לְעָלַם לְעָלְמֵי עָלְמַיָּא.
יִתְבָּרַךְ וְיִשְׁתַּבַּח וְיִתְפָּאַר וְיִתְרוֹמַם וְיִתְנַשֵּׂא
וְיִתְהַדָּר וְיִתְעַלֶּה וְיִתְהַלָּל, שְׁמֵהּ דְּקֻדְשָׁא
בְּרִיךְ הוּא.
לְעֵלָא מִן כָּל בִּרְכָתָא וְשִׁירָתָא תֻּשְׁבְּחָתָא וְנֶחָמָתָא,
דַאֲמִירָן בְּעָלְמָא וְאִמְרוּ אָמֵן.
יְהֵא שְׁלָמָא רַבָּא מִן שְׁמַיָּא חַיִּים וְשָׂבָע
וִישוּעָה וְנֶחָמָה וְשֵׁיזָבָה וּרְפוּאָה וּגְאֻלָּה
וּסְלִיחָה וְכַפָּרָה וְרֵוַח וְהַצָּלָה לָנוּ וּלְכָל
עַמּוֹ יִשְׂרָאֵל וְאִמְרוּ אָמֵן.
עוֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם
עָלֵינוּ וְעַל כָּל עַמּוֹ יִשְׂרָאֵל, וְאִמְרוּ אָמֵן.
`
const prefix = `
נטרדל דרדנבי רלה נדא
כרתבה גא דנא נגרופא נגרפיח נקדומא
פירסא קונדלא דמגרס נסרטא
`
const caret_char = '_'

const nikud_pisuk = kaddish.match(/[א-ת][^א-ת]*/g).map(m => m.slice(1))
const prefix_chars = prefix.match(/[א-ת]/g)
console.log(nikud_pisuk.length, prefix_chars.length + document.querySelectorAll('svg text').length)

function update_caret(current) {
    if (current)
        current.classList.remove('blink')
    const caret = document.querySelector('svg text:empty')
    if (caret) {
        caret.textContent = caret_char
        caret.classList.add('blink')
    }
    if (current) {
        (caret || current).scrollIntoView({behavior: 'smooth'})
        document.activeElement.blur()
    }
    return caret
}
const first = update_caret()

document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey)
        return
    const chars = [...document.querySelectorAll('svg text:not(:empty)')]
    const current = chars.pop()
    if (event.key.match(/[א-ת]/) && current.textContent == caret_char) {
        current.textContent = event.key
        let caret = update_caret(current)
        if (!caret && !play.classList.contains('on'))
            play.click()
    }
    else if (event.key == 'Backspace' && current != first)
    {
        if (current.textContent == caret_char)
            chars.pop().textContent = ''
        current.textContent = ''
        update_caret(current)
    } else if (event.key == ' ' && event.target == document.body)
        event.preventDefault()
})

let voices = speechSynthesis.getVoices()
if (!voices.length)
    speechSynthesis.addEventListener('voiceschanged', () => voices = speechSynthesis.getVoices())

play.addEventListener('click', event => {
    if (play.classList.toggle('on')) {
        const utter = new SpeechSynthesisUtterance([...prefix_chars, ...document.querySelectorAll('svg text:not(:empty):not(.blink)')].map((e, i) => (e.textContent ?? e) + nikud_pisuk[i]).join(''))
        console.log(utter.text)
        utter.lang = 'he'
        const voice = voices.find(v => v.lang.startsWith('he') || v.lang.startsWith('iw'))
        if (voice) {
            utter.voice = voice
            utter.lang = voice.lang
        }
        utter.rate = .6
        utter.onend = e => {console.log(e.charIndex, utter.text.length); if (e.charIndex == utter.text.length) play.click()}
        speechSynthesis.speak(utter)
    } else speechSynthesis.cancel()
})