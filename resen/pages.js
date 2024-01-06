const pages = {
    "/": {title: "רֶסֶן", alt: "Resen", author: "oulipoh", skip: true},

    "achshav/": {title: "אָח־שָׁב – עַכְ־שָׁו", alt: "Ach-Shav", author: "brunogrife", kw: [0, "sound"]},
    "cent/": {title: "מתוך \"מאה תמונות מלחמה\"", alt: "From \"One hundred visions of war\"", author: ["julienvocance", "rotematar"], kw: [0, "poem"]},
    "disappearance/": {title: "היעלמות", alt: "Disappearance", author: "rotematar", kw: [0, "text"]},
    "exceeding/": {title: "מֵעֵבר לַשלם", alt: "Exceeding the entirety", author: ["mikamilgrom", "avimilgrom"], kw: [0, "audiovisual", "live code", "open source", "software"]},
    "imagine/": {title: "דמיין", alt: "/imagine", author: "liorzalmanson", kw: [0, "poem"]},
    "petri/": {title: "פואטיקת פטרי פטריוטית", alt: "Patriotic Petri Poetry", author: "eyalgruss", kw: [0, "audiovisual", "live code", "open source", "poem", "software"]},
    "things/": {title: "קורים עכשיו דברים עם השפה", alt: "Things are happening now with the language", author: "noashaham", kw: [0, "poem"]},
    "systems/": {title: "מערכות", alt: "Systems", author: "noashaham", kw: [0, "poem"]},
    "journal": {title: "אודות כתב העת", alt: "About this journal", author: "oulipoh"}
}

const kw_labels = {
    "2d 3d": "רב־ממדי",
    "audiovisual": "אורקולי",
    "biblical": "תורני",
    "cipher": "צופן",
    "combinatorial": "קומבינטורי",
    "constraint combo": "שילוב אילוצים",
    "data available": "נתונים להורדה",
    "discourse": "שיח באילוצים",
    "hebrew cheatery": "מִרמת העברית",
    "live code": "קוד חי",
    "new constraint": "אילוץ חדש",
    "open source": "קוד פתוח",
    "palindrome": "פלינדרום",
    "pangram": "פנגרמה",
    "poem": "שיר",
    "record": "שיא",
    "self-referral": "מתייחס לעצמו",
    "software": "תוכנה",
    "sound": "צלילים",
    "text": "מלל"
}

const social = {
    "mail": {"url": "mailto:", "label": "&#x2709;"},
    "web": {"label": "&#x1f3e0;&#xfe0e;"},
    "twitter": {"url": "twitter.com", "label": "&#x1f426;"},
    "github": {"url": "github.com", "label": "&#x1f431;"},
    "sponsors": {"url": "github.com/sponsors", "label": "&hearts;"},
    "paypal": {"url": "www.paypal.com/donate/?hosted_button_id=", "label": "&#x1f4b8;"},
    "subscribe": {"url": "forms.gle", "label": "הרשמה לעדכונים"}
}

const authors = {
    "oulipoh": {
        "name": {"": "כתב עת מקוון ליצירה אילוצית וחישובית בעברית (בהקמה)", "en": "An online journal for constrained and computational creation in Hebrew (under construction)"},
        "mail": "eyalgruss+oulipoh@gmail.com",
        "github": "",
        "subscribe": "ayPSSeHk3KL4ALGa9"
    },
    "avimilgrom": {
        "name": {"": "אבי מילגרום", "en": "Avi Milgrom"}
    },
    "brunogrife": {
        "name": {"": "עידן ברונו גרייף", "en": "Bruno Grife"}
    },
    "eyalgruss": {
        "name": {"": "איל יהוה גרוּס", "en": "Eyal Yehowa Gruss"},
        "mail": "@gmail.com",
        "web": ".com",
        "twitter": "eyaler",
        "github": "eyaler",
        "sponsors": "eyaler",
        "paypal": "LNJ6F3FR79ARE"
    },
    "julienvocance": {
        "name": {"": "ז'וליאן ווֹקַנס", "en": "Julien Vocance"}
    },
    "liorzalmanson": {
        "name": {"": "ליאור זלמנסון", "en": "Lior Zalmanson"}
    },
    "mikamilgrom": {
        "name": {"": "מיקה מילגרום", "en": "Mika Milgrom"}
    },
    "noashaham": {
        "name": {"": "נעה שחם", "en": "Mika Noa Shaham"}
    },
    "rotematar": {
        "name": {"": "רותם עטר", "en": "Rotem Atar"}
    }
}

const default_show_snippet = true
const default_show_author = true
const default_rows_first = true
const default_reorder_contents = true
const default_author_pages_folder = '.'
const default_force_new_tab_for_mailto_tel = true
const default_new_tab_for_social = true
const default_new_tab_for_footer = true
const default_copyright_url = "https://creativecommons.org/licenses/by/4.0/"
const default_copyright_symbol = "(CC)(&#xc6c3;)"

const ui = {
    "": {"next": "הבא", "prev": "הקודם", "lang": "עברית", "theme_name": "עיצוב של מתכנת", "theme": "תבנית", "copyright": "", "issue": "גיליון"},
    "en": {"next": "next", "prev": "prev", "lang": "english", "theme_name": "Designed by a programmer", "theme": "Theme", "copyright": "", "issue": "issue", "dir": "ltr"}
}

const shortcuts = {
    "back": "Alt+Backspace",
    "next": "Alt+PageDown",
    "prev": "Alt+PageUp"
}


function get_lang() {
    return location.search.slice(1) in ui ? location.search.slice(1) : Object.keys(ui)[0]
}


const collator = Intl.Collator(document.documentElement.lang, {numeric: true})


function reorder(list_of_strings, lang='', labels=kw_labels) {
    return [...new Set(list_of_strings)].map(String).sort((a, b) => {if (!lang) {a = labels[a] || a, b = labels[b] || b} return collator.compare(a, b)})
}


function get_all_keywords(lang='', page) {
    const keywords = Object.entries(pages).flatMap(([k, v]) => (k == page || !v.skip) && v.kw || [])
    const ordered = reorder(keywords, lang)
    if (page) {
        const counts = keywords.reduce((acc, kw) => (acc[kw] = ++acc[kw] || 1, acc), {})
        const len = Object.values(pages).filter(x => !x.skip).length
        const freq = Object.fromEntries(Object.entries(counts).map(([kw, c]) => [kw, c / len]))
        const entropy = Object.fromEntries(Object.entries(freq).map(([kw, f]) => [kw, -f * Math.log2(f)]))
        const maxent = Math.log2(len)
        const info = Object.fromEntries(Object.entries(entropy).map(([kw, e]) => [kw, e / maxent]))
        return Object.fromEntries(ordered.map(kw => [kw, {count: counts[kw], info: info[kw]}]))
    }
    return ordered
}


function harden(s) {
    return s.replace(/(.*) \/ (.*)/, '<span class="harden">$1 /</span> <span class="harden">$2</span>').replace(/[\p{L}\p{M}\p{N}\xa0]+[\u05be-][\p{L}\p{M}\p{N}\xa0\u05be-]+/gu, '<span class="harden">$&</span>')
}


function update_href(a, url='') {
    if (url) {
        a.href = url
        a.removeAttribute('aria-disabled')
    } else {
        a.removeAttribute('href')
        a.ariaDisabled = 'true'
    }
}


function make_link(url, label, cls, title, new_tab=false, force_new_tab_for_mailto_tel=default_force_new_tab_for_mailto_tel) {
    const a = document.createElement('a')
    update_href(a, url)
    if (cls) {
        if (typeof cls !== 'string')
            cls = cls.join(' ')
        a.className = cls
    }
    if (typeof label === 'string')
        a.innerHTML = harden(label)
    else
        a.appendChild(label)
    if (title)
        a.title = title
    if (new_tab || force_new_tab_for_mailto_tel && (url.startsWith('mailto:') || url.startsWith('tel:')))
        a.target = '_blank'
    return a
}


function get_set_titles(page, lang='', elem) {
    const titles = {label: pages[page]?.title ?? page.split('/')[0], alt: ''}
    if (pages[page]?.alt) {
        titles.alt = pages[page].alt
        if (lang)
            [titles.label, titles.alt] = [titles.alt, titles.label]
    }
    if (elem) {
        if (page) {
            const suffix = elem.title.match(/\[.*/)
            if (suffix) {
                titles.label += ' ' + suffix
                titles.alt += ' ' + suffix
            }
        }
        elem.title = titles.label
    }
    return titles
}


function page2url(page, lang, current, hash) {
    if (!page)
        return ''
    current ??= get_page()
    lang ??= get_lang()
    let url = (page == '/' ? '.' : page) + (page.includes('.') || page.endsWith('/') ? '' : '.html') + (lang && '?' + lang) + (hash ? '#' + hash.replace(/^#/, '') : '')
    if (current.match(/.\//))
        url = '../' + url
    return url
}


function open_internal_link(elem) {
    const [page, ...hash] = elem.hash.slice(1).split('_')
    elem.href = page2url(page, null, null, hash.join('_'))
}


function sanitize(kw) {
    return String(kw).replace(/[^\w]/g, '').toLowerCase()
}


function make_contents(show_snippet=default_show_snippet, show_author=default_show_author, rows_first=default_rows_first) {
    const contents = get_page()
    const lang = get_lang()
    const all_keywords = get_all_keywords(lang)
    const contents_authors = get_make_author(contents, lang)[0].map(harden).join()
    const div = document.createElement('div')
    div.className = 'contents'
    div.classList.toggle('rows_first', rows_first)
    for (const page in pages) {
        if (pages[page].skip)
            continue

        const titles = get_set_titles(page, lang)
        const a = make_link(page2url(page, lang, contents), titles.label, null, titles.alt)

        if (show_snippet && page.endsWith('/')) {
            const img = new Image()
            img.alt = 'תצוגה מקדימה של ' + titles.label
            img.onload = () => a.prepend(img)
            img.src = page + 'snippet'
        }

        if (pages[page].hazard) {
            const meta = document.createElement('meta')
            meta.setAttribute('itemprop', 'accessibilityHazard')
            meta.content = pages[page].hazard
            a.appendChild(meta)
        }

        const p = document.createElement('p')
        p.classList.add(...all_keywords.filter(kw => !pages[page].kw?.includes(kw)).map(kw => 'non_' + sanitize(kw)))
        p.id = 'page_' + div.children.length
        p.appendChild(a)

        if (show_author) {
            const authors = get_make_author(page, lang)[0].map(harden)
            if (authors && authors.join() != contents_authors) {
                const span = document.createElement('span')
                authors.forEach((author, i) => {
                    const s = document.createElement('span')
                    s.innerHTML = author
                    span.appendChild(s)
                })
                p.appendChild(span)
            }
        }
        div.appendChild(p)
    }
    document.body.appendChild(div)
}


function iframe_load_handler() {
    const nav = this.contentDocument.querySelector('nav')
    if (nav)
        nav.style.display = 'none'
    const footer = this.contentDocument.querySelector('footer')
    if (footer)
        footer.style.display = 'hidden'
    this.contentDocument.documentElement.style.overflowY = 'clip'  // Prevent redundant scrollbars in Chrome
    const observer = new ResizeObserver(() => this.style.height = this.contentDocument.documentElement.scrollHeight + 'px')
    observer.observe(this.contentDocument.documentElement)
}


function export_all(lang, skip=[]) {
    document.body.replaceChildren()
    document.body.style.paddingInline = 0
    skip = [skip].flat()
    for (const page in pages) {
        if (skip.includes(page))
            continue
        const iframe = document.createElement('iframe')
        iframe.className = 'export'
        iframe.onload = iframe_load_handler
        iframe.src = page2url(page, lang)
        document.body.appendChild(iframe)
    }
}


// Note: this accounts for lettercase and works cross keyboard layouts, but may miss keys due to input language change
function is_key(event, key) {
    const keys = key.toLowerCase().split(/\+(?!$)/)
    return event.altKey == keys.includes('alt') && (event.ctrlKey || event.metaKey) == keys.includes('ctrl') && event.shiftKey == keys.includes('shift') && event.key.toLowerCase() == keys.pop()
}


function shortcut(elem, key) {
    if (key) {
        elem.ariaKeyshortcuts = key
        document.addEventListener('keydown', e => {if (is_key(e, key)) elem.click()})
    }
}


function add_nav_element(nav, url, label, cls, delta=null, key) {
    const elem = nav.appendChild(make_link(url, label, ['nowrap', cls], key ? `[${key}]` : ''))
    if (delta !== null)
        elem.style.marginInlineEnd = 1.5 + Math.max(delta, 0) + 'em'
    shortcut(elem, key)
    return elem
}


function get_page() {
    const page = decodeURI(location.pathname).match(/([^/]*?\/?)(index)?(\.html)?$/)[1]
    const keys = Object.keys(pages)
    if (keys.includes(page))
        return page
    return '/'
}


function get_width(text, elem, units='em') {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d');
    elem ??= document.body
    const style = getComputedStyle(elem)
    ctx.font = style.font
    ctx.letterSpacing = style.letterSpacing  // Does not work in Safari
    const width = ctx.measureText(text).width
    if (units == 'px')
        return width
    else if (units == 'vw')
        return width * 100 / innerWidth
    else if (units == 'vh')
        return width * 100 / innerHeight
    else if (units == 'em')
        return width / parseFloat(ctx.font)
    throw Error('Not implemented')
}


function set_next_prev_page(page, next, prev, lang, url_kw) {
    let list = Object.keys(pages).filter(x => !pages[x].skip && (!url_kw || pages[x].kw?.map(sanitize).includes(url_kw)))
    const index = list.indexOf(page)
    let next_page = ''
    let prev_page = ''
    if (list.length) {
        next_page = list[(index+1) % list.length]
        prev_page = list[(Math.max(index, 0)-1+list.length) % list.length]
    }
    update_href(next, page2url(next_page, lang, null, url_kw))
    get_set_titles(next_page, lang, next)
    update_href(prev, page2url(prev_page, lang, null, url_kw))
    get_set_titles(prev_page, lang, prev)
}


function make_header(reorder_contents=default_reorder_contents) {
    const page = get_page()
    const lang = get_lang()
    const all_keywords_stats = get_all_keywords(lang, page)
    const titles = get_set_titles(page, lang)
    document.title = titles.label
    let index_title = get_set_titles('/', lang).label
    let is_mobile = false;
    if (matchMedia('(hover: none), (max-device-width: 500px), (max-device-height: 500px)').matches) {
        index_title = index_title.split(' ').slice(0, lang ? 1 : 2).join(' ')
        is_mobile = true;
    }
    const parent_title = decodeURI(location).split('/').slice(-3)[0]
    const nav = document.body.appendChild(document.createElement('nav'))
    let diff = get_width(index_title, nav) - get_width(parent_title, nav)
    let span, back, keywords, trans
    const desc = []
    if (page == '/') {
        span = document.createElement('span')
        span.dir = 'ltr'
        span.innerHTML = parent_title
        add_nav_element(nav, parent_title ? '..' : '', span, 'back', diff, shortcuts.back)
        keywords = Object.keys(all_keywords_stats)
        const en_title = lang == 'en' ? titles.label : titles.alt
        if (en_title)
            desc.push(en_title)
    } else {
        add_nav_element(nav, page2url('.', lang, page), index_title, 'back', -diff, shortcuts.back)
        keywords = reorder(pages[page].kw, lang)
    }

    let url_kw = sanitize(decodeURI(location.hash))
    if (!keywords.map(sanitize).includes(url_kw))
        url_kw = ''
    if (page != '/' && url_kw)
        keywords.unshift(keywords.splice(keywords.map(sanitize).indexOf(url_kw), 1)[0])

    span = document.createElement('span')
    const next = add_nav_element(span, '', ui[lang].next, 'next', 0, shortcuts.next)
    const prev = add_nav_element(span, '', ui[lang].prev, 'prev', 0, shortcuts.prev)
    nav.appendChild(span)
    set_next_prev_page(page, next, prev, lang, url_kw)

    const alt_langs = Object.keys(ui).filter(x => x != lang)
    if (alt_langs.length)
        trans = add_nav_element(nav, page2url(page, alt_langs[0], page, location.hash), ui[alt_langs[0]].lang.slice(0, is_mobile ? 2 : undefined), 'trans')

    const header = document.createElement('header')
    let button
    if (keywords.length) {
        const div = document.createElement('div')
        div.className = 'kw'

        function kw_handler() {
            const on = this.classList.toggle('on')
            const css = [...document.head.querySelectorAll('link[rel=stylesheet]')].pop().sheet
            let found = false
            for (const i in css.cssRules)
                if (css.cssRules[i].selectorText?.slice(1) == this.id.replace(/^kw_/, 'non_')) {
                    css.deleteRule(i)
                    found = true
                    break
                }
            if (!found)
                css.insertRule(`.${this.id.replace(/^kw_/, 'non_')} {color: var(--fg_verydim)}`)
            const buttons_on = div.querySelectorAll('.on')
            kw_x.style.visibility = buttons_on.length ? 'inherit' : 'hidden'
            if (buttons_on.length > 1)
                sessionStorage.kw = JSON.stringify(Array.from(buttons_on, e => e.id))
            else
                delete sessionStorage.kw
            const page_items = document.querySelectorAll('.contents > p')
            if (buttons_on.length == 1 || url_kw)
            {
                url_kw = buttons_on.length == 1 ? buttons_on[0].id.slice(3) : ''
                history.replaceState(history.state, '', '#' + url_kw)
                if (trans)
                    trans.hash = url_kw
                set_next_prev_page(page, next, prev, lang, url_kw)
                page_items.forEach(p => p.firstChild.hash = p.classList.contains('non_' + url_kw) ? '' : url_kw)
            }
            const fg_rgb = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--fg_rgb').replace(/ /g, ', ')})`
            page_items.forEach(p => {const enabled = getComputedStyle(p).color == fg_rgb; p.querySelectorAll('a').forEach(a => {if (enabled) a.removeAttribute('aria-disabled'); else a.ariaDisabled = 'true'})})
            if (reorder_contents)
                document.querySelector('.contents').append(...[...page_items].sort((a, b) => (getComputedStyle(b).color == fg_rgb) - (getComputedStyle(a).color == fg_rgb) || a.id.split('_')[1] - b.id.split('_')[1]))
            if (on && this.id.match(/^kw_\d+$/))
                buttons_on.forEach(e => {if (e != this && e.id.match(/^kw_\d+$/)) e.click()})
        }

        keywords.forEach((kw, button_index) => {
            button = document.createElement(page == '/' ? 'button' : 'a')
            button.id = 'kw_' + sanitize(kw)
            let label = kw_labels[kw] || kw
            if (kw.match(/\d+/))
                label = ui[lang].issue + ' ' + kw

            let alt = ''
            if (trans) {
                alt = kw
                if (kw.match(/\d+/))
                    alt = ui[alt_langs[0]].issue + ' ' + kw
                else if (lang)
                    [label, alt] = [alt, label]
                if (alt == label)
                    alt = ''
            }

            button.innerHTML = label
            button.title = `[pages=${all_keywords_stats[kw].count} info=${(all_keywords_stats[kw].info * 100).toFixed(1)}%] ${alt}`.trim()
            if (page == '/')
                button.onclick = kw_handler
            else {
                button.className = 'always_on'
                button.classList.toggle('persistent', !button_index && url_kw)
                button.href = page2url('.', lang, page, button.id.slice(3))
            }
            div.appendChild(button)
        })
        if (page == '/') {
            button = document.createElement('button')
            button.ariaLabel = 'אפס בחירות'
            button.id = 'kw_x'
            button.innerHTML = 'X'
            button.onclick = () => div.querySelectorAll('.on').forEach(e => e.click())
            div.appendChild(button)
        }
        header.appendChild(div)
    }
    const h1 = document.createElement('h1')
    h1.id = 'h1'
    h1.innerHTML = harden(titles.label)
    if (titles.alt)
        h1.title = titles.alt
    header.appendChild(h1)
    if (ui[lang].dir && ui[lang].dir != document.documentElement.dir)
        nav.dir = ui[lang].dir
    document.body.appendChild(header)
    if (pages[page].author) {
        const current_authors = get_make_author(page, lang, true)[lang != 'en' | 0].join(', ')
        if (page == '/' && current_authors)
            desc.push(current_authors)
    }
    if (desc.length) {
        meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = desc.join(', ')
        document.head.appendChild(meta)
    }
    if (page == '/')
        addEventListener('load', () => {
            if (url_kw)
                document.getElementById('kw_' + url_kw)?.click()
            else if (sessionStorage.kw) {
                JSON.parse(sessionStorage.kw).forEach(kw => document.getElementById(kw).click())
            }
        })
    else
        delete sessionStorage.kw
    return titles.label
}


function get_make_author(page, lang, make=false, author_pages_folder=default_author_pages_folder, new_tab_for_social=default_new_tab_for_social) {
    page ??= get_page()
    lang ??= get_lang()
    let keys = pages[page].author || pages[page].authors
    if (make)
        keys ||= Object.keys(authors)[0]
    let all_names = []
    let all_alt_names = []
    if (keys)
        [...new Set([keys].flat())].forEach(key => {
            const author = authors[key]
            const names = author?.name
            let name = key

            let h2
            if (make) {
                h2 = document.createElement('h2')
                h2.className = 'author'
            }

            let alt_name
            if (names) {
                name = names[lang] || names[''] || Object.values(names)[0] || name
                alt_name = Object.entries(names).filter(([k, v]) => k != lang && v).map(x => x[1])[0]
                if (make && lang in names && alt_name)
                    h2.title = alt_name
            }
            all_names.push(name)
            all_alt_names.push(alt_name || name)

            if (make) {
                const a = make_link('', name)
                h2.appendChild(a)
                fetch(page2url(author_pages_folder + '/' + key, lang, page), {method: 'HEAD'}).then(response => {if (response.ok) update_href(a, response.url)})

                const networks = Object.keys(author || {}).filter(k => k != 'name' && k in social)
                if (networks.length) {
                    const span = document.createElement('span')
                    span.className = 'social'
                    networks.forEach(net => {
                        if (span.innerHTML)
                            span.innerHTML += '&ensp;'
                        let prefix = ''
                        if (!author[net].match(/[:/]/) && social[net].url)
                            prefix = social[net].url
                            if (!prefix.match(/:(?!\/\/)|[/=]$/))
                                prefix += '/'
                        if (!prefix.includes(':'))
                            prefix = 'https://' + prefix
                        if (author[net].match(/^(\.|@|$)/))
                            author[net] = key + author[net]
                        const a = span.appendChild(make_link(prefix + author[net] + (social[net].suffix || ''), social[net].label, net, net[0].toUpperCase() + net.slice(1), new_tab_for_social))
                        a.dataset.label = a.textContent
                    })
                    h2.appendChild(span)
                }
                document.body.appendChild(h2)
            }
        })
    return [all_names, all_alt_names]
}


function make_footer(new_tab_for_footer=default_new_tab_for_footer, copyright_url=default_copyright_url, copyright_symbol=default_copyright_symbol)
{
    const lang = get_lang()
    let span = document.createElement('span')
    span.innerHTML += ui[lang].theme + ':&nbsp;'
    span.appendChild(make_link([...document.scripts].flatMap(s => s.src || [])[0], ui[lang].theme_name, 'nowrap', null, new_tab_for_footer))
    const flex = document.createElement('div')
    flex.appendChild(span)

    if (ui[lang].copyright) {
        span = document.createElement('span')
        span.appendChild(make_link(copyright_url, ui[lang].copyright, 'nowrap', null, new_tab_for_footer))
        span.innerHTML += '&nbsp;'
        const bdi = document.createElement('bdi')
        bdi.className = 'nowrap'
        bdi.innerHTML = copyright_symbol
        span.appendChild(bdi)
        flex.appendChild(span)
    }

    const footer = document.createElement('footer')
    footer.appendChild(flex)
    document.body.appendChild(footer)
}


function show_cursor(elem) {
    elem.classList.remove('show_cursor')
    elem.offsetWidth  // Restart animation, see: https://css-tricks.com/restart-css-animation/
    elem.className = 'show_cursor'
}


// FULLSCREEN


let wake_lock = null;


function request_wake_lock() {
    navigator.wakeLock?.request('screen').then(lock => wake_lock = lock).catch(e => console.error(e.message))  // Doesn't work in Firefox (< 122)
}


function visibility_change_handler() {
    if (wake_lock !== null && document.visibilityState == 'visible')
        request_wake_lock()
}


function toggle_fullscreen(event_or_elem, landscape=true, elem) {
    if (event_or_elem.preventDefault)
        event_or_elem.preventDefault()
    elem ??= event_or_elem?.currentTarget || event_or_elem
    const was_not_fullscreen_before = !document.fullscreenElement
    if (was_not_fullscreen_before) {
        if (!elem.dataset.has_fullscreen_handler) {
            elem.dataset.has_fullscreen_handler = true
            elem.addEventListener('fullscreenchange', () => {
                if (elem.classList.toggle('fullscreen')) {
                    if (landscape)
                        screen.orientation.lock('landscape').catch(e => console.error(e.message))  // Works only in Chrome Android. See: https://bugzilla.mozilla.org/show_bug.cgi?id=1744125
                    request_wake_lock()
                    document.addEventListener('visibilitychange', visibility_change_handler)
                } else
                    wake_lock?.release().then(() => wake_lock = null)
            })
        }
        elem.requestFullscreen({navigationUI: 'hide'}).catch(e => console.error(e.message))
    } else
        document.exitFullscreen()
    return was_not_fullscreen_before
}
