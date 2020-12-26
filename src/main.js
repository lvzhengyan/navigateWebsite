const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const website = localStorage.getItem('website')
const websiteObject = JSON.parse(website)
const hashMap = websiteObject || [{
        logo: 'B',
        url: 'https://www.bilibili.com/'
    },
    {
        logo: 'V',
        url: 'https://vuejs.org/'
    },
    {
        logo: 'B',
        url: 'https://www.baidu.com'
    },
    {
        logo: 'G',
        url: 'https://www.google.com'
    },
    {
        logo: 'T',
        url: 'https://translate.google.com/'
    }
]

const removeUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
        .replace('.com', '')
        .replace('.cn', '')
        .replace('.org', '')
}

console.log(hashMap);

const render = () => {
    $siteList.find('li:not(.lastLi)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo[0].toUpperCase()}</div>
                    <div class="link">${removeUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-baseline-close-px"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url, "_self")
        })

        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()


$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是什么')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url;
        }
        hashMap.push({
            logo: removeUrl(url)[0],
            url: url
        })
        render()
    })

window.onbeforeunload = () => {
    const storage = JSON.stringify(hashMap)
    localStorage.setItem('website', storage)
}