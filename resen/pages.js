// Copyright 2023-2025 by Eyal Yehowa Gruss, licensed under CC BY 4.0
// Please attribute by linking to a version of this file [e.g. as done in make_footer()], containing these comments


const canonical_origin = 'https://resen.co.il'

const pages = {
    "/": {title: "רֶסֶן", alt: "Resen", author: "resen", logo: "media/resen.svg", skip: true},
    // "open-call-kmeot/": {title: "קול קורא: קמעות", alt: "Open call: Talismans", author: "resen"},
    // "open-call-horaa/": {title: "קול קורא: הוראה", alt: "Open call: Instruction", author: "resen"},

    "palindock/": {title: "תעגון שמש נוגעת", alt: "Anchor of a touching sun", author: "noamdovev", kw: [3, "palindrome", "poem"], skip: true},
    "palisdead/": {title: "מות ידיד יתום", alt: "Death of an orphan friend", author: "uriamiram", kw: [3, "palindrome", "poem"], skip: true},
    "palindream/": {title: "מול  חיי – חלום", alt: "Facing my life – a dream", author: "liormaayan", kw: [3, "palindrome", "poem"], skip: true},

    "2/": {title: "פתח דבר לגיליון ב – הוראה", alt: "Foreword to Issue 2 – Instruction", author: ["nurilevy", "eranhadas"], kw: [2], skip: true},
    "dada/": {title: "מכתב כופר דאדא", alt: "Dada ransom note", author: "eliyahorn", kw: [2, "visual"], skip: true},
    "grok/": {title: "גרוק", alt: "Grok", author: "danieloz", kw: [2, "interactive", "visual"], skip: true},
    "geometry/": {title: "גאומטרייה II", alt: "Geometry II", author: "lidasharetmassad", kw: [2, "interactive", "visual"], skip: true},
    "unbearable/": {title: "הקלות הבלתי נסבלת של ההקלדה", alt: "The unbearable lightness of typing", author: "avimeishar", kw: [2, "interactive", "visual"], skip: true},
    "noa/": {title: "נעה א; נעה ב", alt: "Noa A; Noa B", author: "noakatz", kw: [2, "visual"], skip: true},
    "tnua/": {title: "תנועה", author: "eliautochkin", kw: [2, "software", "visual"], skip: true},
    "exegesis/": {title: "ביאורי הסימנים למשפחות השכולות", alt: "Exegesis of the signs for the bereaved families", author: "nettalevtov", kw: [2, "interactive", "visual"], skip: true},
    "flesh/": {title: "בשר ותולעים", alt: "Flesh and worms", author: "avimeishar", kw: [2, "interactive", "sound", "visual"], skip: true},
    "opening/": {title: "הוראות פתיחה", alt: "Opening instructions", author: "war", kw: [2, "collection", "poem"], skip: true},
    "operating/": {title: "הוראות הפעלה", alt: "Operating instructions", author: "mechanics", kw: [2, "collection", "poem", "visual"], skip: true},
    "humanity/": {title: "הוראות לאנושות", alt: "Instructions for humanity", author: "sensory", kw: [2, "collection", "poem"], skip: true},
    "heart/": {title: "הוראות ללב", alt: "Instructions for the heart", author: "relationship", kw: [2, "2d 3d", "collection", "poem", "story", "visual"], skip: true},

    "tsc/": {title: "קוד המקור", alt: "The source code", author: "ofirliberman", kw: [1, "interactive", "visual"], skip: true},
    "relief/": {title: "תבליט־נגד", alt: "Counter relief", author: "michailgrobman", kw: [1, "biblical", "interactive", "visual"], skip: true},
    "yomyom/": {title: "קמעות יום־יום", alt: "Everyday talismans", author: "ohadhadad", kw: [1, "interactive", "visual"]},
    "mahdukh/": {title: "מה יש לך גברת מהדוך?", alt: "What is with you Mrs. Mahdukh?", author: "doritkedar", kw: [1, "biblical"]},
    "fortuna/": {title: "פורטונה", alt: "Fortuna", author: "adinaviterbo", kw: [1, "visual"]},
    "shem/": {title: "שם המפורש", alt: "Shem HaMeforash", author: "avrahamguybarchil", kw: [1, "biblical", "visual"]},
    "kosheret/": {title: "קושרת אות", alt: "Kosheret Ot", author: "moresun", kw: [1, "sound", "visual"]},
    "zag/": {title: "קמעות צג", alt: "Kmeot Zag (screen talismans)", author: "eakoukli", kw: [1, "interactive", "live code", "poem", "software", "sound", "visual"]},
    "fateful/": {title: "שהות הרת־גורל", alt: "Fateful stay", author: "shoeyraz", kw: [1, "story"], hazard: "motionSimulation"},
    "psychosophy/": {title: "פסיכוסופיה: פתיחה", alt: "Psychsophy: A reading", author: ["avinoamsternheim", "menahemgoldenberg"], kw: [1, "visual"]},
    "talismother/": {title: "אימא קמעית", alt: "Talis-Mother", author: "sandravalabregue", kw: [1, "biblical", "visual"]},
    "umbilical/": {title: "טבוּר", alt: "Umbilical", author: "nettalevtov", kw: [1, "live code", "poem", "visual"]},
    "taase/": {title: "תעשה", alt: "Ta-a-se", author: "ayaamikam", kw: [1, "biblical", "cipher", "interactive", "visual"], hazard: "flashing"},
    "kaddish/": {title: "קדיש (שלד)", alt: "Kaddish (skeleton)", author: "omridanino", kw: [1, "biblical", "interactive", "poem", "sound", "visual"]},
    "water/": {title: "קוד מים | תרשימי זרימה", alt: "Code of water | Flow charts", author: "arikweiss", kw: [1, "2d 3d", "biblical", "interactive", "visual"]},
    "talismetta/": {title: "טליס־מטא", alt: "Talis-Metta", author: ["neorashem", "nimrodkerrett"], kw: [1, "software", "visual"]},
    "snark/": {title: "כרחש אבמ\"ח וכרחש אדו\"ש", alt: "ABMḤ snark and ADWŠ snark", author: "eyalgruss", kw: [1, "2d 3d", "combinatorial", "interactive", "new constraint", "pangram", "software", "sound", "visual"]},

    "receptacle/": {title: "כלי קיבולת", alt: "Receptacle", author: "amitbenami", kw: ["poem"]},
    "harh/": {title: "הַרְח", alt: "Harḥ", author: "eyalgruss", kw: ["poem"]},

    "0/": {title: "פתח דבר לגיליון 0 – מלחמה", alt: "Foreword to Issue 0 – War", author: "alexbenari", kw: [0]},
    "imagine/": {title: "דמיין", alt: "Imagine", author: "liorzalmanson", kw: [0, "poem"]},
    "cent/": {title: "מתוך מאה תמונות מלחמה", alt: "From One hundred visions of war", author: "julienvocance", translator: "rotematar", kw: [0, "poem", "translation"]},
    "petri/": {title: "פואטיקת פטרי פטריוטית", alt: "Patriotic Petri Poetry", author: "eyalgruss", kw: [0, "generative", "live code", "poem", "software", "visual"]},
    "exceeding/": {title: "מעֵבר לַשלם", alt: "Exceeding the entirety", author: ["mikamilgrom", "avimilgrom"], kw: [0, "live code", "visual"]},
    "things/": {title: "קורים עכשיו דברים עם השפה", alt: "Things are happening now with the language", author: "noashaham", kw: [0, "poem"]},
    "systems/": {title: "מערכות", alt: "Systems", author: "noashaham", kw: [0, "poem"]},
    "disappearance/": {title: "היעלמות", alt: "Disappearance", author: "rotematar", kw: [0]},
    "down/": {title: "רע", alt: "Down", author: "alexbenari", kw: [0, "interactive", "poem", "visual"]},
    "seasons/": {title: "כאילו המלחמה הייתה לחלק מעונות השנה", alt: "As if the war were part of the seasons", author: "adisorek", kw: [0, "interactive", "sound"]},
    "tribe/": {title: "השבט הנושא את עיניו השמיימה", alt: "The tribe with its eyes on the sky", author: "italocalvino", translator: "jonathanfine", kw: [0, "story", "translation"]},
    "achshav/": {title: "אָח־שָׁב – עַכְ־שָׁו", alt: "Ach-Shav", author: "brunogrife", kw: [0, "sound"]},

    "about/": {title: "אודות כתב העת", alt: "About this journal", author: "resen"},
}

const authors = {
    "resen": {
        "name": {"": "רֶסֶן – כתב עת מקוון ליצירה אילוצית וחישובית בעברית", "en": "Resen - an online journal for constrained and computational creation in Hebrew"},
        "mail": "eyalgruss+resen@gmail.com",
        "facebook": "RESENonline",
        "instagram": "resen_an_online_journal",
        "github": "github.com/oulipoh/oulipoh.github.io",
        "sponsors": "oulipoh",
        "subscribe": "ayPSSeHk3KL4ALGa9",
    },

    "mechanics": {
        "name": {"": "מקבץ מכניקה", "en": "Mechanics collection"},
    },
    "relationship": {
        "name": {"": "מקבץ יחסים", "en": "Relationship collection"},
    },
    "sensory": {
        "name": {"": "מקבץ חושי", "en": "Sensory collection"},
    },
    "war": {
        "name": {"": "מקבץ מלחמה", "en": "War collection"},
    },

    "adinaviterbo": {
        "name": {"": "עדינה ויטרבו", "en": "Adina Viterbo"},
        "instagram": "adina_v",
    },
    "adisorek": {
        "name": {"": "עדי שורק", "en": "Adi Sorek"},
        "web": ".com",
    },
    "alexbenari": {
        "name": {"": "אלכס בן־ארי", "en": "Alex Ben Ari"},
        "web": ".com",
    },
    "amitbenami": {
        "name": {"": "עמית בן עמי", "en": "Amit Ben Ami"},
    },
    "arikweiss": {
        "name": {"": "אריק וייס", "en": "Arik Weiss"},
        "instagram": "arikw99",
    },
    "avimeishar": {
        "name": {"": "אבי מישר", "en": "Avi Meishar"},
    },
    "avimilgrom": {
        "name": {"": "אבי מילגרום", "en": "Avi Milgrom"},
    },
    "avinoamsternheim": {
        "name": {"": "אבינועם שטרנהיים", "en": "Avinoam Sternheim"},
        "web": ".com",
    },
    "avrahamguybarchil": {
        "name": {"": "אברהם גיא ברכיל", "en": "Avraham Guy Barchil"},
        "instagram": "",
    },
    "ayaamikam": {
        "name": {"": "איה עמיקם", "en": "Aya Amikam"},
        "instagram": "aya_amikam",
    },
    "brunogrife": {
        "name": {"": "עידן ברונו גרייף", "en": "Bruno Grife"},
    },
    "danieloz": {
        "name": {"": "דניאל עוז", "en": "Daniel Oz"},
    },
    "doritkedar": {
        "name": {"": "דורית קידר", "en": "Dorit Kedar"},
    },
    "eakoukli": {
        "name": {"": "א. קוּקלי", "en": "E. A. Koukly"},
        "web": "toonsnake.net",
    },
    "eliyahorn": {
        "name": {"": "אליה הורן", "en": "Eliya Horn"},
    },
    "eliautochkin": {
        "name": {"": "אליה אוטוצ'קין", "en": "Elia Utochkin"},
    },
    "eyalgruss": {
        "name": {"": "איל יהוה גרוּס", "en": "Eyal Yehowa Gruss"},
        "mail": "@gmail.com",
        "web": ".com",
        "twitter": "eyaler",
        "github": "eyaler",
        "sponsors": "eyaler",
        "paypal": "LNJ6F3FR79ARE",
    },
    "italocalvino": {
        "name": {"": "איטאלו קאלווינו", "en": "Italo Calvino"},
    },
    "jonathanfine": {
        "name": {"": "יונתן פיין", "en": "Jonathan Fine"},
    },
    "julienvocance": {
        "name": {"": "ז'וליאן ווֹקַנס", "en": "Julien Vocance"},
    },
    "lidasharetmassad": {
        "name": {"": "לידה שרת מסד", "en": "Lida Sharet Massad"},
    },
    "liormaayan": {
        "name": {"": "ליאור מעין", "en": "Lior Maayan"},
    },
    "liorzalmanson": {
        "name": {"": "ליאור זלמנסון", "en": "Lior Zalmanson"},
    },
    "menahemgoldenberg": {
        "name": {"": "מנחם גולדנברג", "en": "Menahem Goldenberg"},
        "web": "www.menahem.net",
    },
    "michailgrobman": {
        "name": {"": "מיכאיל גרובמן", "en": "Michail Grobman"},
        "web": "www.grobman.info",
    },
    "mikamilgrom": {
        "name": {"": "מיקה מילגרום", "en": "Mika Milgrom"},
    },
    "moresun": {
        "name": {"": "מורסאן עוד־שמש", "en": "More'Sun Odd Shemesh"},
        "web": "linktr.ee/oddshemesh",
    },
    "neorashem": {
        "name": {"": "נאורה שם", "en": "Neora Shem"},
        "web": "neora.pro",
    },
    "nettalevtov": {
        "name": {"": "נטע לב טוב", "en": "Netta Lev Tov"},
        "instagram": "netta.lev.tov",
        "web": "netta-lev-tov.com",
    },
    "nimrodkerrett": {
        "name": {"": "נמרוד קרת", "en": "Nimrod Kerrett"},
        "web": "zzzen.com",
    },
    "nirgilad": {
        "name": {"": "ניר גלעד", "en": "Nir Gilad"},
    },
    "noakatz": {
        "name": {"": "נעה כ\"ץ", "en": "Noa Katz"},
        "web": ".net",
    },
    "noamdovev": {
        "name": {"": "נעם דובב", "en": "Noam Dovev"},
        "web": "palindromes.co/",
        "mail": "noamdo@gmail.com",
    },
    "noashaham": {
        "name": {"": "נעה שחם", "en": "Noa Shaham"},
    },
    "nurilevy": {
        "name": {"": "נורי לוי", "en": "Nuri Levy"},
        "instagram": "nuri.levy",
    },
    "ofirliberman": {
        "name": {"": "אופיר ליברמן", "en": "Ofir Liberman"},
        "instagram": "ofir.liberman.art",
    },
    "ohadhadad": {
        "name": {"": "אוהד חדד", "en": "Ohad Hadad"},
        "instagram": "ohad_ohad",
    },
    "omridanino": {
        "name": {"": "עומרי דנינו", "en": "Omri Danino"},
        "instagram": "daninomri",
    },
    "rotematar": {
        "name": {"": "רותם עטר", "en": "Rotem Atar"},
    },
    "sandravalabregue": {
        "name": {"": "סנדרה ואלאברג", "en": "Sandra Valabregue"},
        "web": "sandra-valabregue.com",
    },
    "shoeyraz": {
        "name": {"": "שועי רז", "en": "Shoey Raz"},
        "web": ".wordpress.com",
    },
    "uriamiram": {
        "name": {"": "אורי עמירם", "en": "Uri Amiram"},
    },
}

const ui = {
    "": {"next": "הבא", "prev": "הקודם", "lang": "עברית", "theme_name": "עיצוב של מתכנת", "theme": "תבנית", "copyright": "", "issue": "גיליון", "translator": "(תרגום)"},
    "en": {"next": "next", "prev": "prev", "lang": "english", "theme_name": "Designed by a programmer", "theme": "Theme", "copyright": "", "issue": "issue", "translator": "(translator)", "dir": "ltr"},
}

const kw_labels = {
    3: "ג – יחסים פלינדרומיים",
    2: "ב – הוראה",
    1: "א – קמעות",
    0: "0 – מלחמה",
    "2d 3d": "רב־ממדי",
    "biblical": "תורני",
    "cipher": "צופן",
    "collection": "אסופה",
    "combinatorial": "קומבינטורי",
    "combined forms": "שילוב אילוצים",
    "data available": "נתונים להורדה",
    "discourse": "שיח באילוצים",
    "generative": "מחולל",
    "hebrew cheatery": "מִרמת העברית",
    "interactive": "אינטראקטיבי",
    "live code": "קוד חי",
    "new constraint": "אילוץ חדש",
    "palindrome": "פלינדרום",
    "pangram": "פנגרמה",
    "poem": "שיר",
    "record": "שיא",
    "self-referral": "מתייחס לעצמו",
    "software": "תוכנה",
    "sound": "צלילים",
    "story": "סיפור",
    "tool": "כלי",
    "translation": "תרגום",
    "visual": "חזותי",
}

const social = {
    "mail": {"url": "mailto:", "label": "&#x2709;&#xfe0e;"},
    "web": {"label": "&#x1f3e0;&#xfe0e;"},
    "twitter": {"url": "x.com", "label": "&#x1f426;"},
    "facebook": {"url": "www.facebook.com", "label": "&#x24d5;"},
    "instagram": {"url": "www.instagram.com", "label": "&#x1f4f7;&#xfe0e;"},
    "github": {"url": "github.com", "label": "&#x1f431;"},
    "sponsors": {"url": "github.com/sponsors", "label": "&hearts;"},
    "paypal": {"url": "www.paypal.com/donate/?hosted_button_id=", "label": "&#x1f4b8;"},
    "subscribe": {"url": "forms.gle", "label": "הרשמה לעדכונים"},
}

const shortcuts = {
    "back": "Alt+Backspace",
    "next": "Alt+PageDown",
    "prev": "Alt+PageUp",
}

const default_copyright_url = "https://creativecommons.org/licenses/by/4.0/"
const default_copyright_label = "(CC)(&#xc6c3;)"
const default_force_new_tab_for_mailto_tel = false
const default_new_tab_for_social = false
const default_new_tab_for_footer = false
const default_reorder_contents = true
const default_reverse_issues_kw = true
const default_row_first = true
const default_show_snippet = true
const default_show_author = true

let author_pages_folder = ''
author_pages_folder = author_pages_folder.replace(/^[./]+|[./]+$/g, '')


function get_lang() {
    return location.search.slice(1) in ui ? location.search.slice(1) : Object.keys(ui)[0]
}


const collator = Intl.Collator(document.documentElement.lang, {numeric: true})


function reorder(list_of_strings, lang='', reverse_issues=default_reverse_issues_kw, labels=kw_labels) {
    return [...new Set(list_of_strings)].map(String).sort((a, b) => {
        const a_is_issue = !!a.match(/^\d+$/)
        const b_is_issue = !!b.match(/^\d+$/)
        if (!lang) {
            a = labels[a] ?? a
            b = labels[b] ?? b
        }
        return b_is_issue - a_is_issue || (reverse_issues && a_is_issue && b_is_issue ? -1 : 1) * collator.compare(a, b)
    })
}


function get_all_keywords(lang='', reverse_issues=default_reverse_issues_kw, page) {
    const keywords = Object.entries(pages).flatMap(([k, v]) => (k == page || !v.skip) && v.kw || [])
    const ordered = reorder(keywords, lang, reverse_issues)
    if (page == null)
        return ordered
    const counts = keywords.reduce((acc, kw) => (acc[kw] = ++acc[kw] || 1, acc), {})
    const len = Object.values(pages).filter(v => !v.skip).length
    const freq = Object.fromEntries(Object.entries(counts).map(([kw, c]) => [kw, c / len]))
    const entropy = Object.fromEntries(Object.entries(freq).map(([kw, f]) => [kw, -f * Math.log2(f)]))
    const maxent = Math.log2(len)
    const info = Object.fromEntries(Object.entries(entropy).map(([kw, e]) => [kw, e / maxent]))
    return [ordered, Object.fromEntries(ordered.map(kw => [kw, {count: counts[kw], info: info[kw]}]))]  // Note object keys parsing as integers will appear first an ascending order. See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
}


function soften(s) {
    return s.split(' ').map((w, i) => i ? w : w.replace(/(?<=[\p{L}\p{M}\p{N}]\p{Pd})(?=[\p{L}\p{M}\p{N}])/gu, '\u200b')).join(' ')
}


function update_href(a, url='', rel) {
    if (url) {
        a.href = url
        if (rel)
            a.rel = rel
        a.removeAttribute('aria-disabled')
    } else {
        a.removeAttribute('href')
        a.removeAttribute('rel')
        a.ariaDisabled = 'true'
    }
}


function make_link(url, label, cls, title, new_tab=false, force_new_tab_for_mailto_tel=default_force_new_tab_for_mailto_tel, rel) {
    const a = document.createElement('a')
    update_href(a, url, rel)
    if (cls) {
        if (typeof cls != 'string')
            cls = cls.join(' ')
        a.className = cls
    }
    if (typeof label == 'string')
        a.innerHTML = soften(label)
    else
        a.appendChild(label)
    if (title)
        a.title = title
    if (new_tab || force_new_tab_for_mailto_tel && (url.startsWith('mailto:') || url.startsWith('tel:')))  // Note that mailto: links in Firefox will not open in new tabs. See: https://bugzilla.mozilla.org/show_bug.cgi?id=646552
        a.target = '_blank'
    return a
}


function get_set_titles(page, lang, elem) {
    page ??= get_page()
    lang ??= get_lang()
    const titles = {label: pages[page]?.title ?? page.split('/')[0], alt: ''}
    if (titles.label.match(/\p{P}$/u))
        titles.label = '\u2068' + titles.label + '\u2069'
    if (pages[page]?.alt) {
        titles.alt = pages[page].alt
        if (titles.alt.match(/\p{P}$/u))
            titles.alt = '\u2068' + titles.alt + '\u2069'
        if (lang)
            [titles.label, titles.alt] = [titles.alt, titles.label]
    }
    if (elem) {
        if (page != null) {
            const suffix = elem.title.match(/\[.*/)
            if (suffix) {  // keyboard shortcut
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
    if (current.match(/.\//) || author_pages_folder && decodeURI(location.pathname).includes('/' + author_pages_folder + '/'))
        url = '../' + url
    return url
}


function open_internal_link(elem, replace) {
    const [page, ...hash] = elem.hash.replace(/^#|\?(.*)/g, '').split('#')
    const url = page2url(page, elem.hash.match(/\?(.*)/)?.[1] || elem.search.slice(1) || null, null, hash.join('#'))
    if (replace)
        location.replace(url)
    else
        elem.href = url
}


function sanitize(kw) {
    return String(kw).replace(/\W/g, '').toLowerCase()
}


function merge(...lists) {
    return lists.map(list => list ?? []).flat()
}


function make_contents(show_snippet=default_show_snippet, show_author=default_show_author, row_first=default_row_first) {
    const contents = get_page()
    const lang = get_lang()
    const all_keywords = get_all_keywords(lang)
    const contents_authors = get_make_author(contents, lang)[0].join()
    const div = document.createElement('div')
    div.className = 'contents'
    div.classList.toggle('row_first', row_first)
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

        ;[...new Set(merge(pages[page].hazard, pages[page].hazards))].forEach(hazard => {
            const meta = a.appendChild(document.createElement('meta'))
            meta.setAttribute('itemprop', 'accessibilityHazard')
            meta.content = hazard
            a.setAttribute('itemscope', '')
        })

        const p = document.createElement('p')
        p.classList.add(...all_keywords.filter(kw => pages[page].kw?.map(String).includes(kw)).map(kw => '_' + sanitize(kw)))
        p.id = 'page_' + div.childElementCount
        p.appendChild(a)

        let span
        if (pages[page].wip) {
            span = p.appendChild(document.createElement('span'))
            const s = span.appendChild(document.createElement('span'))
            s.classList.add('wip')
            s.textContent = ui[lang].wip
        }

        if (show_author) {
            let [authors, alt_authors] = get_make_author(page, lang)
            if (authors.join() != contents_authors)
                authors.forEach((author, i) => {
                    span ??= p.appendChild(document.createElement('span'))
                    const s = span.appendChild(document.createElement('span'))
                    s.textContent = author
                    if (alt_authors[i] != author)
                        s.title = alt_authors[i]
                })
        }
        div.appendChild(p)
    }
    document.body.appendChild(div)
}


function iframe_load_handler() {
    if (this.contentDocument.title == '404 Not Found') {
        this.remove()
        return
    }
    const nav = this.contentDocument.querySelector('nav')
    if (nav)
        nav.style.display = 'none'
    const footer = this.contentDocument.querySelector('footer')
    if (footer)
        footer.style.visibility = 'hidden'
    this.contentDocument.documentElement.style.overflowY = 'clip'  // Prevent redundant scrollbars in Chrome
    new ResizeObserver(() => {const h = this.contentDocument.documentElement.scrollHeight; if (h >= 10800) console.warn(`Truncated height of ${this.contentDocument.title} from ${h}`); this.style.height = h + 'px'}).observe(this.contentDocument.documentElement)  // Note: vh units will be relative to the iframe and may cause excessive heights
}


function export_all(lang, skip=true) {
    document.body.replaceChildren()
    document.body.style.paddingInline = 0
    if (skip !== true && skip !== false)
        skip = [skip].flat()
    for (const page in pages)
        if (page == '/' || (skip !== true || !pages[page].skip) && (!Array.isArray(skip) || !skip.includes(page))) {
            const iframe = document.createElement('iframe')
            iframe.className = 'export'
            iframe.onload = iframe_load_handler
            iframe.src = page2url(page, lang)
            document.body.appendChild(iframe)
        }
}


function is_shortcut(event, shortcut) {
    shortcut = shortcut.toLowerCase().split(/ ?[+-] ?(?!$)/)
    let shortcut_key = shortcut.pop()
    if (shortcut_key == 'space')
        shortcut_key = ' '
    let event_key = event.key.toLowerCase()
    if (shortcut_key == '+' && event.code == 'Equal' && !'-_'.includes(event.key)
        || shortcut_key == '-' && event.code == 'Minus' && !'+?\\'.includes(event.key)
        || event.code == 'Digit' + shortcut_key  // For AZERTY keyboard
        || !event_key.match(/^[a-z]$/) && event.code == 'Key' + shortcut_key.toUpperCase())  // For Hebrew keyboard
        event_key = shortcut_key
    return event_key == shortcut_key && (event.altKey || event.getModifierState?.('AltGraph')) == shortcut.includes('alt') && (event.ctrlKey || event.metaKey) == shortcut.includes('ctrl') && event.shiftKey == shortcut.includes('shift')
}


function add_shortcut(elem, shortcut) {
    if (shortcut) {
        elem.ariaKeyShortcuts = shortcut.replaceAll(' ', '')
        addEventListener('keydown', event => {
            if (is_shortcut(event, shortcut)) {
                event.preventDefault()
                elem.click()
            }
        })
    }
}


function add_nav_element(nav, url, label, cls, delta=0, key) {
    const elem = nav.appendChild(make_link(url, label, ['nowrap', cls], key ? `[${key}]` : ''))
    if (delta != null)
        elem.style.marginInlineEnd = 1.5 + Math.max(delta, 0) + 'em'
    add_shortcut(elem, key)
    return elem
}


function get_page() {
    const path = decodeURI(location.pathname)
    const page = path.match(/([^/]*?\/?)(index)?(\.html)?$/)[1]
    if (page in pages)
        return page
    const folder = path.match(/([^/]*?\/?)[^\/]*$/)[1]
    if (folder in pages)
        return folder
    return '/'
}


function get_width(text, elem, units='em') {  // Note: If the font has not completed loading, this may cause CSS parsing errors and return an inaccurate result
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
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
    const list = Object.keys(pages).filter(p => !pages[p].skip && (!url_kw || pages[p].kw?.map(sanitize).includes(url_kw)))
    const index = list.indexOf(page)
    const next_page = list[(index+1) % list.length] ?? ''
    const prev_page = list[(Math.max(index, 0)-1+list.length) % list.length] ?? ''
    update_href(next, page2url(next_page, lang, null, url_kw), 'next')
    get_set_titles(next_page, lang, next)
    update_href(prev, page2url(prev_page, lang, null, url_kw), 'prev')
    get_set_titles(prev_page, lang, prev)
}


function get_kw_label(kw, lang='') {
    let label = lang ? kw : kw_labels[kw] ?? kw
    if (kw.match(/^\d+$/)) {
        if (!lang && !label.includes(' – '))
            label = kw + ' – ' + label
        label = ui[lang].issue + ' ' + label
    }
    return label
}


function make_header(nav_only=false, reverse_issues_kw=default_reverse_issues_kw, reorder_contents=default_reorder_contents, new_tab_for_social=default_new_tab_for_social) {
    const page = get_page()
    const lang = get_lang()
    const [all_keywords, all_keywords_stats] = get_all_keywords(lang, reverse_issues_kw, page)
    const titles = get_set_titles(page, lang)
    document.title = titles.label
    if (canonical_origin) {
        const link = document.head.appendChild(document.createElement('link'))
        link.rel = 'canonical'
        link.href = new URL(page, canonical_origin)
    }


    // nav:

    let index_title = get_set_titles('/', lang).label
    const is_mobile = matchMedia('(max-width: 480px), (max-height: 480px)').matches
    if (is_mobile)
        index_title = index_title.split(' ').slice(0, lang ? 1 : 2).join(' ')
    const base = page2url('.', lang, page)
    const parent = new URL(base + '/..', location).href
    const parent_title = new URL(base, location).href == parent ? '' : decodeURI(parent).split('/').slice(-2)[0]
    const nav = document.createElement('nav')
    let diff = get_width(index_title, nav) - get_width(parent_title, nav)
    let span, back, keywords, trans
    if (page == '/') {
        const bdi = document.createElement('bdi')
        bdi.textContent = parent_title
        add_nav_element(nav, parent_title ? '..' : '', bdi, 'back', diff, shortcuts.back)
        keywords = all_keywords
    } else {
        add_nav_element(nav, base, index_title, 'back', -diff, shortcuts.back)
        keywords = reorder(pages[page].kw, lang, reverse_issues_kw)
    }

    let url_kw = sanitize(decodeURIComponent(location.hash))
    if (!keywords.map(sanitize).includes(url_kw))
        url_kw = ''
    if (page != '/' && url_kw)
        keywords.unshift(keywords.splice(keywords.map(sanitize).indexOf(url_kw), 1)[0])

    span = document.createElement('span')
    const next = add_nav_element(span, '', ui[lang].next, 'next', 0, shortcuts.next)
    const prev = add_nav_element(span, '', ui[lang].prev, 'prev', null, shortcuts.prev)
    nav.appendChild(span)
    set_next_prev_page(page, next, prev, lang, url_kw)

    const alt_langs = Object.keys(ui).filter(k => k != lang)
    if (alt_langs.length)
        trans = add_nav_element(nav, page2url(page, alt_langs[0], page, location.hash), ui[alt_langs[0]].lang.slice(0, is_mobile ? 2 : undefined), 'trans')

    document.body.appendChild(nav)
    if (nav_only)
        return

    // header:

    const header = document.createElement('header')
    let button
    if (keywords.length) {
        const css = document.head.querySelector('link[rel=stylesheet]:not([href^=data])').sheet
        const div = document.createElement('div')
        div.className = 'kw'

        function kw_handler() {
            const on = this.classList.toggle('on')
            const prefix = '.contents > p:not(.'
            let found
            for (const i in css.cssRules)
                if (found = css.cssRules[i].selectorText?.slice(prefix.length, -1) == this.id.replace(/^kw/, '')) {
                    css.deleteRule(i)
                    break
                }
            if (!found)
                css.insertRule(`${prefix}${this.id.replace(/^kw/, '')}) {color: var(--fg_verydim) !important}`)
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
                page_items.forEach(p => p.firstChild.hash = p.classList.contains('_' + url_kw) ? url_kw : '')
            }
            const fg_rgb = getComputedStyle(document.documentElement).color
            page_items.forEach(p => {const enabled = getComputedStyle(p).color == fg_rgb; p.querySelectorAll(':scope > a').forEach(a => {if (enabled) a.removeAttribute('aria-disabled'); else a.ariaDisabled = 'true'})})
            if (reorder_contents)
                document.querySelector('.contents').append(...[...page_items].sort((a, b) => (getComputedStyle(b).color == fg_rgb) - (getComputedStyle(a).color == fg_rgb) || a.id.split('_')[1] - b.id.split('_')[1]))
            if (on && this.id.match(/^kw_\d+$/))
                buttons_on.forEach(e => {if (e != this && e.id.match(/^kw_\d+$/)) e.click()})
        }

        keywords.forEach((kw, button_index) => {
            button = document.createElement(page == '/' ? 'button' : 'a')
            if (button.tagName.toLowerCase() == 'a')
                button.rel = 'tag'
            button.id = 'kw_' + sanitize(kw)
            const label = get_kw_label(kw, lang)

            let alt = ''
            if (trans) {
                alt = get_kw_label(kw, alt_langs[0])
                if (alt == label)
                    alt = ''
            }

            button.textContent = label
            button.title = `${alt}\nworks=${all_keywords_stats[kw].count}\ninfo=${(all_keywords_stats[kw].info * 100).toFixed(1)}%`.trim()
            if (page == '/') {
                button.onclick = kw_handler
                css.insertRule(`body:has(.${button.id.replace(/^kw/, '')}:hover, .${button.id.replace(/^kw/, '')} > :focus-visible) #${button.id} {border-color: var(--on)}`)
            } else {
                button.className = 'always_on'
                button.classList.toggle('persistent', !button_index && url_kw)
                button.href = page2url('.', lang, page, button.id.slice(3))
            }
            div.appendChild(button)
        })
        if (page == '/') {
            button = div.appendChild(document.createElement('button'))
            button.ariaLabel = 'הסר את כל המסננים'
            button.id = 'kw_x'
            button.textContent = 'X'
            button.onclick = () => div.querySelectorAll('.on').forEach(e => e.click())
        }
        header.appendChild(div)
    }
    const en_title = lang == 'en' ? titles.label : titles.alt
    const h1 = document.createElement('h1')
    h1.id = 'h1'
    if (pages[page].logo) {
        const img = new Image()
        img.alt = titles.label
        img.src = pages[page].logo
        h1.appendChild(img)
        h1.title = en_title ?? titles.label
    } else {
        h1.textContent = soften(titles.label)
        if (titles.alt)
            h1.title = titles.alt
    }
    header.appendChild(h1)
    if (ui[lang].dir && ui[lang].dir != document.documentElement.dir)
        nav.dir = ui[lang].dir
    const desc = []
    if (en_title)
        desc.push(en_title)
    if (pages[page].author || pages[page].authors || pages[page].by || pages[page].trans || pages[page].translation || pages[page].translator || pages[page].translators || pages[page].colab || pages[page].colabs || pages[page].collab || pages[page].collabs || pages[page].collaboration || pages[page].collaborator || pages[page].collaborators || pages[page].with) {
        const current_authors = get_make_author(page, lang, header, new_tab_for_social)[lang != 'en' | 0].join(', ')
        if (current_authors)
            desc.push(current_authors)
    }
    document.currentScript.parentElement.appendChild(header)


    if (desc.length) {
        const meta = document.head.appendChild(document.createElement('meta'))
        meta.content = desc.join(', ')
        meta.name = 'description'
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


function get_make_author(page, lang, elem, new_tab_for_social=default_new_tab_for_social) {
    page ??= get_page()
    lang ??= get_lang()
    const translators = merge(pages[page].trans, pages[page].translation, pages[page].translator, pages[page].translators)
    const collaborators = merge(pages[page].colab, pages[page].colabs, pages[page].collab, pages[page].collabs, pages[page].collaboration, pages[page].collaborator, pages[page].collaborators, pages[page].with)
    let keys = [...new Set(merge(pages[page].author, pages[page].authors, pages[page].by, translators, collaborators))]
    if (elem && authors && !keys.length)
        keys = Object.keys(authors).slice(0, 1)
    const all_names = []
    const all_alt_names = []
    let have_with
    keys.forEach(key => {
        const author = authors[key]
        const names = author?.name
        let name = key

        let h2
        if (elem) {
            h2 = document.createElement('h2')
            h2.className = 'author'
        }

        let alt_name
        if (names) {
            name = names[lang] || names[''] || Object.values(names)[0] || name
            alt_name = Object.entries(names).find(([k, v]) => k != lang && v)?.[1]
            if (translators.includes(key) || collaborators.includes(key)) {
                const alt_langs = Object.keys(ui).filter(k => k != lang)
                if (alt_langs.length) {
                    if (translators.includes(key))
                        alt_name += ' ' + ui[alt_langs[0]].translator
                    if (!have_with && collaborators.includes(key))
                        alt_name = ui[alt_langs[0]].with + ' ' + alt_name
                }
            }
            if (elem && alt_name && alt_name != name)
                h2.title = alt_name
        }
        if (translators.includes(key))
            name += ' ' + ui[lang].translator
        if (!have_with && collaborators.includes(key)) {
            name = ui[lang].with + ' ' + name
            have_with = true
        }

        all_names.push(name)
        all_alt_names.push(alt_name || name)

        if (elem) {
            const a = h2.appendChild(make_link('', name))
            let url = key
            if (author_pages_folder)
                url = author_pages_folder + '/' + url
            url = page2url(url, lang, page, key)
            if (url != page)
                fetch(url, {method: 'HEAD'}).then(response => {if (response.ok) update_href(a, url, 'author')})

            const networks = Object.keys(author || {}).filter(k => k != 'name' && k in social)
            if (networks.length) {
                const span = h2.appendChild(document.createElement('span'))
                span.className = 'social'
                networks.forEach(net => {
                    if (span.innerHTML)
                        span.innerHTML += ' '
                    let prefix = ''
                    if (!author[net].match(/[:/]/) && social[net].url)
                        prefix = social[net].url
                        if (!prefix.match(/:(?!\/\/)|[/=]$/))
                            prefix += '/'
                    if (!prefix.includes(':'))
                        prefix = 'https://' + prefix
                    if (author[net].match(/^([.@]|$)/))
                        author[net] = key + author[net]
                    const a = span.appendChild(make_link(prefix + author[net] + (social[net].suffix || ''), social[net].label, net, net[0].toUpperCase() + net.slice(1), new_tab_for_social))
                    a.dataset.label = a.textContent
                })
            }
            elem.appendChild(h2)
        }
    })
    return [all_names, all_alt_names]
}


function make_footer(copyright_url=default_copyright_url, copyright_label=default_copyright_label, new_tab_for_footer=default_new_tab_for_footer)
{
    const lang = get_lang()
    const footer = document.createElement('footer')
    const div = footer.appendChild(document.createElement('div'))
    let span = div.appendChild(document.createElement('span'))
    span.innerHTML += ui[lang].theme + ':&nbsp;'
    span.appendChild(make_link([...document.scripts].flatMap(s => s.src || [])[0], ui[lang].theme_name, 'nowrap', null, new_tab_for_footer))

    if (ui[lang].copyright) {
        span = div.appendChild(document.createElement('span'))
        span.appendChild(make_link(copyright_url, ui[lang].copyright, 'nowrap', null, new_tab_for_footer, null, 'license'))
        span.innerHTML += '&nbsp;'
        const bdi = span.appendChild(document.createElement('bdi'))
        bdi.className = 'nowrap'
        bdi.innerHTML = copyright_label
    }

    document.body.appendChild(footer)
}


function textarea_writeln(textarea, line='', chars_for_reset=500000) {
    const selection_start = textarea.selectionStart
    const selection_end = textarea.selectionEnd
    const should_scroll = (textarea.scrollTop + 1 >= textarea.scrollHeight - textarea.clientHeight || textarea.clientHeight != textarea.dataset.height || textarea.clientWidth != textarea.dataset.width) && selection_start == selection_end
    if (!line && textarea.textLength > chars_for_reset) {
        should_scroll = true
        textarea.value = textarea.value.match(/(^|\n)\n/) ? textarea.value.split(/(^|\n)(?=\n)/).pop() : ''
    }
    textarea.value += line + '\n'
    if (should_scroll) {
        textarea.scrollTop = textarea.scrollHeight
        textarea.dataset.height = textarea.clientHeight
        textarea.dataset.width = textarea.clientWidth
    } else if (selection_start != selection_end) {  // Needed for restoring the selection after value change. Note: In Firefox this will scroll the selection into view
        textarea.selectionStart = selection_start
        textarea.selectionEnd = selection_end
    }
}


function sidebyside_align(...elems) {
    (elems.length ? elems : document.querySelectorAll('.sidebyside')).forEach(elem => {
        const lines = elem.textContent.split('\n')
        const maxlen = Math.max(...lines.map(line => get_width(line, elem)))
        elem.style.setProperty('--sidebyside_long_line', `'${lines.find(line => get_width(line, elem) == maxlen)}'`)
    })
}


function show_hide_cursor(event_or_elem) {
    const elem = event_or_elem.currentTarget || event_or_elem
    elem.classList.remove('show_cursor')
    elem.offsetWidth  // Restart animation. See: https://css-tricks.com/restart-css-animation/
    elem.classList.add('show_cursor')
}


addEventListener('keydown', e => {if (e.key == '~') document.body.classList.toggle('psycler')})


// FULLSCREEN


let wake_lock


function request_wake_lock() {
    navigator.wakeLock?.request('screen').then(lock => wake_lock = lock).catch(e => console.warn(e.message))
}


function visibility_change_handler() {
    if (wake_lock && document.visibilityState == 'visible')
        request_wake_lock()
}


function toggle_fullscreen(event_or_elem, landscape=true, target_screen, elem) {
    event_or_elem?.preventDefault?.()
    elem ??= event_or_elem?.currentTarget || event_or_elem
    const was_not_fullscreen_before = !document.fullscreenElement
    if (was_not_fullscreen_before) {
        if (!elem.dataset.has_fullscreen_handler) {
            elem.dataset.has_fullscreen_handler = true
            elem.addEventListener('fullscreenchange', () => {
                if (elem.classList.toggle('fullscreen')) {
                    if (landscape)
                        screen.orientation.lock('landscape').catch(e => console.warn(e.message))
                    request_wake_lock()
                    document.addEventListener('visibilitychange', visibility_change_handler)
                } else
                    wake_lock?.release().then(() => wake_lock = null)
            })
        }
        elem.requestFullscreen({navigationUI: 'hide', screen: target_screen || undefined}).catch(e => console.warn(e.message))
    } else
        document.exitFullscreen()
    return was_not_fullscreen_before
}
