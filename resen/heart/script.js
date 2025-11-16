;[[
    [1, 2, 0,
        'סבתא חלמה על ילד שמנמן ובלונדיני בחצר'
    ],
    [16, 1, 1,
        'לאחר שבועיים נולדתי'
    ]
],

[
    [3, 8, 0,
        'בסוף כל יום לימודים נכנסתי לביתה'
    ],
    [4, 1, 1,
        'הייתה בינינו רק דלת'
    ],
    [2, 4, 0,
        'היא ישבה על הכורסה הדהויה בסלון'
    ],
    [12, 2, 1,
        'פעם הייתה ורודה'
    ],
    [8, 17, 0,
        'פתרה תשבצי היגיון'
    ],
    [1, 20, 0,
        'הסתכלתי ניסיתי ולא הבנתי כלום'
    ],
    [2, 11, 0,
        'היא הסבירה לי כל פתרון'
    ],
    [11, 13, 0,
        'ולפעמים סתם ראינו יחד מכבי'
    ]
],

[
    [4, 6, 0,
        'פעם אצל הדודה באמריקה'
    ],
    [4, 4, 0,
        'סבתא הביאה חוברת צהובה'
    ],
    [5, 2, 1,
        'בסופה היו הפתרונות'
    ],
    [28, 5, 1,
        'סבתא יצאה מהחדר'
    ],
    [7, 20, 0,
        'היא חזרה והמתנתי כנמר'
    ],
    [14, 12, 0,
        'כששאלה באיזה צבע אגסוס?'
    ],
    [1, 15, 0,
        'צעקתי אפרפר'
    ],
    [4, 9, 0,
        'היא שאלה הצצת בתשובות?'
    ],
    [2, 18, 0,
        'ושנינו צחקנו נורא'
    ]
],

[
    [2, 4, 0,
        'שבועיים לפני הגיוס שלי'
    ],
    [6, 3, 1,
        'עורקיה סגרו עליה'
    ],
    [10, 11, 0, 
        'הציעו לב פתוח או צנתור'
    ],
    [31, 1, 1,
        'המצנתר מעולם לא טעה'
    ],
    [4, 14, 0,
        'הוא הסביר שגם הפעם לא'
    ],
    [5, 19, 0,
        'הניתוח הצליח'
    ],
    [19, 19, 0,
        'והחלמת'
    ],
    [4, 8, 0,
        'חייל קצוץ שיער הולך לישון'
    ],
    [3, 1, 0,
        'מחכה לעוד ביקור מסבתא'
    ]
]].forEach(answers => {
    rosen = rosen.insertAdjacentElement('afterend', document.createElement('div'))
    rosen.classList.add('table')
    const tbody = rosen.appendChild(document.createElement('table')).appendChild(document.createElement('tbody'))
    for (let y = 0; y < 20; y++) {
        const tr = tbody.appendChild(document.createElement('tr'))
        for (let x = 0; x < 38; x++)
            tr.appendChild(document.createElement('td'))
    }
    answers.forEach(([x, y, v, answer], i) => {
        ;[...i + 1 + answer].forEach((c, j) => {
            const td = tbody.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`)
            c = c.replace('ך', 'כ').replace('ם', 'מ').replace('ן', 'נ').replace('ף', 'פ').replace('ץ', 'צ')
            if (td.textContent && td.textContent != c)
                console.log('Error', x, y, answer, i)
            td.textContent = c
            if (!j)
                td.classList.add('number')
            if (v)
                y++
            else
                x++
        })
    })
})