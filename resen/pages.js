pages = {
    index: {title: 'רֶסֶן', alt: 'Resen', special: true},

    squares: {title: 'ריבועי הקסם הגדולים בעברית', alt: 'The largest magic squares in Hebrew', keywords: ['2D', 'Hebrew cheatery', 'palindrome', 'record', 'software']},
    cogram: {title: 'סכוּמילים', alt: 'Cograms and codromes', keywords: ['2D', 'constraint combo', 'cypher', 'Hebrew cheatery', 'math', 'new constraint', 'palindrome', 'software']},
    pangrams: {title: 'פנגרמות מושלמות מינימליות', alt: 'Minimal perfect pangrams', keywords: ['constraint combo', 'Hebrew cheatery', 'math', 'new constraint', 'pangram', 'record', 'software']},
    eyal: {title: 'אֱיָליטרציה', alt: 'Eyalliteration', keywords: ['constraint combo', 'discourse', 'poem', 'self-referral']},
    otomat: {title: 'אות־וֹמט תאי', alt: 'Letter cellular automata', keywords: ['2D', 'math', 'new constraint', 'software']},
    taz: {title: 'תחום אוטונומי זמני', alt: 'Temporary Autonomous Zone', keywords: ['cypher', 'math', 'new constraint', 'software']},
    hayush: {title: 'סדרות היוּש', alt: 'Aronson sequences in Hebrew', keywords: ['math', 'record', 'self-referral', 'software']},
}

kw_dict = {
    '2D': 'דו־ממדי',
    'constraint combo': 'שילוב אילוצים',
    cypher: 'צופן',
    discourse: 'שיח באילוצים',
    'Hebrew cheatery': 'מִרמת העברית',
    'machine learning': 'למידת מכונה',
    math: 'מתמטי',
    'new constraint': 'אילוץ חדש',
    palindrome: 'פלינדרום',
    pangram: 'פנגרמה',
    poem: 'שיר',
    record: 'שיא',
    'self-referral': 'מתייחס לעצמו',
    software: 'תוכנה',
}

social = {
    mail: {url: 'mailto:eyalgruss+oulipoh@gmail.com', label: '&#x2709;'},
    github: {url: 'https://github.com/oulipoh', label: '&#x1f431;'},
}

ui = {
    '': {author: 'כתב עת מקוון לספרות עברית אילוצית - בהקמה', next: 'הבא', prev: 'הקודם', lang: 'עברית', refs: 'ראו גם', theme_name: 'עיצוב של מתכנת', theme: 'תבנית', copyright: 'כל הזכויות שמורות'},
    'en': {author: 'An online journal for constrained Hebrew literature - under construction', next: 'Next', prev: 'Prev', lang: 'English', refs: 'See also', theme_name: 'Designed by a programmer', theme: 'Theme', copyright: 'All rights reversed', dir: 'ltr'},
}

globe = '&#x1f310;&#xfe0e;'


function get_lang() {
    return location.search.slice(1) in ui ? location.search.slice(1) : Object.keys(ui)[0]
}


function flip(lang) {
    return ui[lang].dir && ui[lang].dir != document.documentElement.dir
}


function order(list_of_strings, lang='') {
    return [...new Set(list_of_strings)].sort((a, b) => {if (!lang) {a = kw_dict[a] || a, b = kw_dict[b] || b} return a.localeCompare(b)})
}


function get_all_keywords(lang = '') {
    return order(Object.values(pages).flatMap(x => x.keywords || []), lang)
}


function harden_makaf(s) {
    return s.replace(/[\p{L}\p{M}\p{N}\xa0]+־[\p{L}\p{M}\p{N}\xa0]+/gu, '<span class="nowrap">$&</span>')
}


function create_link(url, label, cls) {
    let a = document.createElement('a')
    if (cls)
        a.classList.add(...[cls].flat())
    a.href = url
    if (typeof label === 'string')
        a.innerHTML = harden_makaf(label)
    else
        a.appendChild(label)
    return a
}


function get_hash(kw) {
    return 'kw_' + encodeURIComponent(kw).replace(/%/g, '')
}


function get_titles(name, lang='') {
    let titles = {title: pages[name].title, alt: ''}
    if (pages[name].alt) {
        titles.alt = pages[name].alt
        if (lang)
            [titles.title, titles.alt] = [titles.alt, titles.title]
    }
    return titles
}


function make_url(name, lang=null) {
    if (lang === null)
        lang = get_lang()
    return name + (name.includes('.') ? '' : '.html') + (lang && '?' + lang)
}


function make_contents() {
    let lang = get_lang()
    let all_keywords = get_all_keywords(lang)
    let div = document.createElement('div')
    div.className = 'contents'
    if (flip(lang))
        div.dir = ui[lang].dir
    let keywords, titles, a, p
    for (name in pages) {
        if (pages[name].special)
            continue
        keywords = all_keywords.filter(kw => !pages[name].keywords?.includes(kw)).map(get_hash)
        titles = get_titles(name, lang)
        a = create_link(make_url(name, lang), titles.title, keywords)
        a.title = titles.alt
        p = document.createElement('p')
        p.appendChild(a)
        div.appendChild(p)
    }
    document.body.appendChild(div)
}


function export_all(lang, skip) {
    if (skip)
        skip = [skip].flat()
    document.body.innerHTML = ''
    document.body.style.paddingInline = 0
    let iframe
    for (name in pages) {
        if (skip?.includes(name))
            continue
        iframe = document.createElement('iframe')
        iframe.className = 'export'
        iframe.onload = function() {
            this.contentDocument.querySelector('nav').remove()
            this.contentDocument.querySelector('footer').remove()
            this.style.height = this.contentDocument.documentElement.scrollHeight + 8 + 'px'
        }
        iframe.src = make_url(name, lang)
        document.body.appendChild(iframe)
    }
}


function add_nav_element(nav, url, label, symbol='', ident=0)
{
    if (nav.innerHTML && ident != -1) nav.innerHTML += ident === null ? '&nbsp;'.repeat(4) : '&emsp;' + '&ensp;'.repeat(1.5 + Math.max(ident, 0)*.8)
    let a = create_link(url, label, 'nowrap')
    if (symbol) {
        span = document.createElement('span')
        span.className = 'symbol_' + symbol.match(/\w+/)
        let span2 = document.createElement('span')
        span2.innerHTML = symbol
        span.appendChild(span2)
        a.prepend(span)
    }
    nav.appendChild(a)
    return a
}


function make_header() {
    let name = decodeURI(location.pathname).split('/').slice(-1)[0].split('.')[0] || 'index'
    let lang = get_lang()
    let titles = get_titles(name, lang)
    document.title = titles.title
    let nav = document.createElement('nav')
    let list = Object.keys(pages).filter(x => !pages[x].special || x == name)
    let index = list.indexOf(name)
    let prev = (index-1+list.length) % list.length
    let next = (index+1) % list.length
    let index_title = get_titles('index', lang).title
    let mobile = matchMedia('(hover: none), (max-device-width: 500px), (max-device-height: 500px)').matches
    if (mobile)
        index_title = index_title.split(' ').slice(0, lang ? 1 : 2).join(' ')
    let parent_title = decodeURI(location).split('/').slice(-3)[0]
    let diff = index_title.replace(/\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7/g, '').length - parent_title.replace(/\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7/g, '').length
    let backarrow = ui[lang].dir == 'ltr' ? '&larr;' : '&rarr;'
    let keywords, trans, span, a
    if (name == 'index') {
        span = document.createElement('span')
        span.dir = 'ltr'
        span.innerHTML = parent_title
        a = add_nav_element(nav, '..', span, backarrow)
        keywords = get_all_keywords(lang)
    }
    else {
        add_nav_element(nav, make_url('.', lang), index_title, backarrow)
        keywords = order(pages[name].keywords, lang)
        diff *= -1
    }
    a = add_nav_element(nav, make_url(list[next], lang), ui[lang].next, '&darr;', ident=diff)
    a.title = get_titles(list[next], lang).title
    a = add_nav_element(nav, make_url(list[prev], lang), ui[lang].prev, '&uarr;', ident=null)
    a.title = get_titles(list[prev], lang).title
    alt_langs = Object.keys(ui).filter(x => x != lang)
    if (alt_langs.length) {
        trans = add_nav_element(nav, make_url(name, alt_langs[0]), mobile ? '' : ui[alt_langs[0]].lang, globe, ident=-1)
        span = trans.querySelector('span')
        span.classList.add('green')
        if (mobile)
            span.style.textAlign = 'start'
        if (ui[lang].dir == 'ltr') {
            trans.dir = 'rtl'
            trans.style.float = 'right'
        }
        else {
            trans.dir = 'ltr'
            trans.style.float = 'left'
        }
    }
    document.body.appendChild(nav)
    let header = document.createElement('header')
    let div, url_hash, button
    if (keywords.length) {
        div = document.createElement('div')
        div.className = 'keywords'
        url_hash = 'kw_' + location.hash.slice(1).replace(/%/g, '')
        let hash, css, found, buttons_on
        for (kw of keywords) {
            button = document.createElement('button')
            button.id = get_hash(kw)
            if (lang) {
                button.innerHTML = kw
                button.title = kw_dict[kw] || kw
            }
            else {
                button.innerHTML = kw_dict[kw] || kw
                button.title = kw
            }
            if (name == 'index') {
                button.onclick = (kw => (function() {
                    this.classList.toggle('on')
                    hash = get_hash(kw)
                    css = document.getElementById('mystyle').sheet
                    found = false
                    for (i = css.cssRules.length - 1; i >= 0; i--)
                        if (css.cssRules[i].selectorText?.slice(1) == hash) {
                            css.deleteRule(i)
                            found = true
                        }
                    if (!found) {
                        css.insertRule(`.${hash} {color: var(--fg_dull);}`)
                        if (matchMedia('(forced-colors: active)').matches)
                            css.insertRule(`.${hash} {text-decoration-line: line-through;}`)
                    }
                    buttons_on = document.getElementsByClassName('on')
                    x_button.style.visibility = buttons_on.length ? 'visible' : 'hidden'
                    if (buttons_on.length == 1)
                        history.replaceState('', '', '#' + (lang ? buttons_on[0].textContent : buttons_on[0].title))
                    else if (url_hash)
                        history.replaceState('', '', '#')
                    if (trans) {
                        url = new URL(trans.href)
                        url.hash = location.hash
                        trans.href = url
                        trans.hash = location.hash
                    }
                    url_hash = location.hash.slice(1).replace(/%/g, '')
                }))(kw)
                button.ontouchstart = ''  // for iOS Safari :active
            }
            else
            {
                button.className = 'always_on'
                button.onclick = (kw => (() => location.href = make_url('.', lang) + '#' + kw))(kw)
            }
            div.appendChild(button)
        }
        if (name == 'index') {
            button = document.createElement('button')
            button.id = 'x_button'
            button.innerHTML = 'X'
            button.onclick = () => [...document.getElementsByClassName('on')].forEach(e => e.click())
            button.style.visibility = 'hidden'
            div.appendChild(button)
        }
        header.appendChild(div)
    }
    let h1 = document.createElement('h1')
    h1.innerHTML = harden_makaf(titles.title)
    h1.title = titles.alt
    header.appendChild(h1)
    if (flip(lang)) {
        nav.dir = ui[lang].dir
        if (div)
            div.dir = ui[lang].dir
        h1.dir = ui[lang].dir
    }
    document.body.appendChild(header)
    if (name == 'index' && url_hash)
        document.getElementById(url_hash)?.click()
}


function make_author(alt_author) {
    let h2 = document.createElement('h2')
    let lang = get_lang()
    h2.innerHTML = alt_author || ui[lang].author
    if (Object.keys(social).length) {
        h2.innerHTML += '&emsp;'
        if (flip(lang)) {
            h2.dir = ui[lang].dir
        }
        let span = document.createElement('span')
        span.classList.add('social', 'green')
        let a
        for (cls in social) {
            a = create_link(social[cls].url, social[cls].label, cls)
            span.appendChild(a)
            span.innerHTML += ' '
        }
        h2.appendChild(span)
    }
    document.body.appendChild(h2)
}


function make_footer() {
    let lang = get_lang()
    let f = flip(lang) & 1
    let refs = document.querySelector('.refs:last-of-type')
    if (refs) {
        refs.dataset.label = ui[lang].refs + ':'
        if (f)
            refs.dir = ui[lang].dir
    }

    let footer = document.createElement('footer')
    if (f)
        footer.dir = ui[lang].dir
    let a = create_link((new Error).fileName, ui[lang].theme_name, 'nowrap')
    footer.innerHTML += ui[lang].theme + ':&nbsp;'
    footer.appendChild(a)
    footer.innerHTML += '&emsp;&emsp;'
    a = create_link('https://creativecommons.org/licenses/by/4.0/', ui[lang].copyright, 'nowrap')
    footer.appendChild(a)
    footer.innerHTML += '&nbsp;'
    let span = document.createElement('span')
    span.className = 'nowrap'
    span.dir = 'ltr'
    span.innerHTML = '(CC)(&#xc6c3;)'
    footer.appendChild(span)
    document.body.appendChild(footer)
}
