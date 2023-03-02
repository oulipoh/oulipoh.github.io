pages = {
    index: {title: 'רֶסֶן', alt: 'Resen', author: 'oulipoh', special: true},

    eyal: {title: 'אֱיָליטרציה', alt: 'Eyalliteration', author: 'eyal', keywords: ['constraint combo', 'discourse', 'poem', 'self-referral']},
    otomat: {title: 'אות־וֹמט תאי', alt: 'OT-o-mata: letter cellular automata', author: 'eyal', keywords: ['2D', 'math', 'new constraint', 'software']},
    taz: {title: 'תחום אוטונומי זמני', alt: 'Temporary Autonomous Zone', author: 'eyal', keywords: ['cypher', 'math', 'new constraint', 'software']},
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
        mail: {url: 'mailto:', label: '&#x2709;'},
        web: {label: '&#x1f3e0;&#xfe0e;'},
        twitter: {url: 'https://twitter.com/', label: '&#x1f426;'},
        github: {url: 'https://github.com/', label: '&#x1f431;'},
}

authors = {
    oulipoh: {
        name: {'': 'כתב עת מקוון ליצירה אילוצית וחישובית בעברית (בהקמה)', en: 'An online journal for constrained and computational creation in Hebrew (under construction)'},
        mail: 'eyalgruss+oulipoh@gmail.com',
        github: 'oulipoh',
    },
    eyal: {
        name: {'': 'איל יהוה גרוּס', en: 'Eyal Yehowa Gruss'},
        mail: 'eyalgruss@gmail.com',
        web: 'https://eyalgruss.com',
        twitter: 'eyaler',
        github: 'eyaler',
    },
}

ui = {
    '': {next: 'הבא', prev: 'הקודם', lang: 'עברית', refs: 'ראו גם', theme_name: 'עיצוב של מתכנת', theme: 'תבנית', copyright: 'כל הזכויות שמורות'},
    en: {next: 'next', prev: 'prev', lang: 'English', refs: 'See also', theme_name: 'Designed by a programmer', theme: 'Theme', copyright: 'All rights reversed', dir: 'ltr'},
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
    const a = document.createElement('a')
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


function get_titles(page, lang='') {
    const titles = {title: pages[page].title, alt: ''}
    if (pages[page].alt) {
        titles.alt = pages[page].alt
        if (lang)
            [titles.title, titles.alt] = [titles.alt, titles.title]
    }
    return titles
}


function make_url(page, lang=null) {
    if (lang === null)
        lang = get_lang()
    return page + (page.includes('.') ? '' : '.html') + (lang && '?' + lang)
}


function open_internal_link(event) {
    event.preventDefault()
    location.href = make_url(event.target.href.split('#')[1])
}


function make_contents() {
    const lang = get_lang()
    const all_keywords = get_all_keywords(lang)
    const div = document.createElement('div')
    div.className = 'contents'
    if (flip(lang))
        div.dir = ui[lang].dir
    let keywords, titles, a, p
    for (const page in pages) {
        if (pages[page].special)
            continue
        keywords = all_keywords.filter(kw => !pages[page].keywords?.includes(kw)).map(get_hash)
        titles = get_titles(page, lang)
        a = create_link(make_url(page, lang), titles.title, keywords)
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
    for (const page in pages) {
        if (skip?.includes(page))
            continue
        iframe = document.createElement('iframe')
        iframe.className = 'export'
        iframe.onload = function() {
            this.contentDocument.querySelector('nav').remove()
            this.contentDocument.querySelector('footer').remove()
            this.style.height = this.contentDocument.documentElement.scrollHeight + 8 + 'px'
        }
        iframe.src = make_url(page, lang)
        document.body.appendChild(iframe)
    }
}


function add_nav_element(nav, url, label, symbol='', ident=0)
{
    if (nav.innerHTML && ident != -1) nav.innerHTML += ident === null ? '&nbsp;'.repeat(4) : '&emsp;' + '&ensp;'.repeat(1.5 + Math.max(ident, 0)*.8)
    const a = create_link(url, label, 'nowrap')
    if (symbol) {
        span = document.createElement('span')
        span.className = 'symbol_' + symbol.match(/\w+/)
        const span2 = document.createElement('span')
        span2.innerHTML = symbol
        span.appendChild(span2)
        a.prepend(span)
    }
    nav.appendChild(a)
    return a
}


function get_page() {
    return decodeURI(location.pathname).split('/').slice(-1)[0].split('.')[0] || 'index'
}


function make_header() {
    const page = get_page()
    const lang = get_lang()
    const titles = get_titles(page, lang)
    document.title = titles.title
    const nav = document.createElement('nav')
    const list = Object.keys(pages).filter(x => !pages[x].special || x == page)
    const index = list.indexOf(page)
    let index_title = get_titles('index', lang).title
    const mobile = matchMedia('(hover: none), (max-device-width: 500px), (max-device-height: 500px)').matches
    if (mobile)
        index_title = index_title.split(' ').slice(0, lang ? 1 : 2).join(' ')
    const parent_title = decodeURI(location).split('/').slice(-3)[0]
    let diff = index_title.replace(/[\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7]/g, '').length - parent_title.replace(/[\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7]/g, '').length
    const backarrow = ui[lang].dir == 'ltr' ? '&larr;' : '&rarr;'
    let keywords, trans, span, a
    if (page == 'index') {
        span = document.createElement('span')
        span.dir = 'ltr'
        span.innerHTML = parent_title
        a = add_nav_element(nav, '..', span, backarrow)
        keywords = get_all_keywords(lang)
    }
    else {
        add_nav_element(nav, make_url('.', lang), index_title, backarrow)
        keywords = order(pages[page].keywords, lang)
        diff *= -1
    }
    if (list.length > 1) {
        const prev = (index-1+list.length) % list.length
        const next = (index+1) % list.length
    a = add_nav_element(nav, make_url(list[next], lang), ui[lang].next, '&darr;', ident=diff)
    a.title = get_titles(list[next], lang).title
    a = add_nav_element(nav, make_url(list[prev], lang), ui[lang].prev, '&uarr;', ident=null)
    a.title = get_titles(list[prev], lang).title
    }
    const alt_langs = Object.keys(ui).filter(x => x != lang)
    if (alt_langs.length) {
        trans = add_nav_element(nav, make_url(page, alt_langs[0]), mobile ? '' : ui[alt_langs[0]].lang, globe, ident=-1)
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
    const header = document.createElement('header')
    let div, url_hash, button
    if (keywords.length) {
        div = document.createElement('div')
        div.className = 'keywords'
        url_hash = 'kw_' + location.hash.slice(1).replace(/%/g, '')
        let hash, css, found, i, buttons_on
        for (const kw of keywords) {
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
            if (page == 'index') {
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
                        css.insertRule(`.${hash} {color: var(--fg_dull)}`)
                        if (matchMedia('(forced-colors: active)').matches)
                            css.insertRule(`.${hash} {text-decoration-line: line-through}`)
                    }
                    buttons_on = document.getElementsByClassName('on')
                    x_button.style.visibility = buttons_on.length ? 'visible' : 'hidden'
                    if (buttons_on.length == 1)
                        history.replaceState('', '', '#' + buttons_on[0][lang ? 'textContent' : 'title'])
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
        if (page == 'index') {
            button = document.createElement('button')
            button.id = 'x_button'
            button.innerHTML = 'X'
            button.onclick = () => [...document.getElementsByClassName('on')].forEach(e => e.click())
            button.style.visibility = 'hidden'
            div.appendChild(button)
        }
        header.appendChild(div)
    }
    const h1 = document.createElement('h1')
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
    if (page == 'index' && url_hash)
        document.getElementById(url_hash)?.click()
    if (pages[page].author)
        make_author()
    return titles.title
}


function make_author() {
    const page = get_page()
    const lang = get_lang()
    const key = pages[page].author || Object.keys(authors)[0]
    if (!key)
        return
    const author = authors[key]
    const names = author?.name
    let name = key
    const h2 = document.createElement('h2')
    if (names) {
        name = names[lang] || names[''] || Object.values(names)[0] || name
        const alt_names = Object.entries(names).filter(([k, v]) => k != lang && v).map(x => x[1])
        if (lang in names && alt_names.length)
            h2.title = alt_names[0]
    }
    h2.innerHTML = harden_makaf(name)
    if (flip(lang))
        h2.dir = ui[lang].dir
    if (author) {
        const networks = Object.entries(author).filter(([k, v]) => k != 'name' && k in social && v).map(x => x[0])
        if (networks.length) {
        h2.innerHTML += '&emsp;'
            const span = document.createElement('span')
        span.classList.add('social', 'green')
        let a
            for (const net of networks) {
                a = create_link((social[net].url || '') + author[net], social[net].label, net)
            span.appendChild(a)
            span.innerHTML += ' '
        }
        h2.appendChild(span)
    }
    }
    document.body.appendChild(h2)
    return name
}


function make_footer() {
    const lang = get_lang()
    const f = flip(lang) & 1
    const refs = document.querySelector('.refs:last-of-type')
    if (refs) {
        refs.dataset.label = ui[lang].refs + ':'
        if (f)
            refs.dir = ui[lang].dir
    }

    const flex = document.createElement('div')
    if (f)
        flex.dir = ui[lang].dir

    let span = document.createElement('span')
    let a = create_link(Error().fileName, ui[lang].theme_name, 'nowrap')
    span.innerHTML += ui[lang].theme + ':&nbsp;'
    span.appendChild(a)
    flex.appendChild(span)

    span = document.createElement('span')
    a = create_link('https://creativecommons.org/licenses/by/4.0/', ui[lang].copyright, 'nowrap')
    span.appendChild(a)
    span.innerHTML += '&nbsp;'
    const span2 = document.createElement('span')
    span2.className = 'nowrap'
    span2.dir = 'ltr'
    span2.innerHTML = '(CC)(&#xc6c3;)'
    span.appendChild(span2)
    flex.appendChild(span)

    const footer = document.createElement('footer')
    footer.appendChild(flex)
    document.body.appendChild(footer)
}
