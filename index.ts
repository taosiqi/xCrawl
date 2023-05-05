// 1.导入模块 ES/CJS
import xCrawl from 'x-crawl'

// 2.创建一个爬虫实例
const myXCrawl = xCrawl({maxRetry: 3, intervalTime: {max: 3000, min: 2000}})

// 3.设置爬取任务
// 调用 startPolling API 开始轮询功能，每隔一天会调用回调函数
myXCrawl.startPolling({m: 1}, async (count, stopPolling) => {
    // 调用 crawlPage API 来爬取页面
    const res = await myXCrawl.crawlPage({
        targets: ['https://www.cngold.org/c/2023-05-04/c8643793.html'],
        viewport: {width: 1920, height: 1080}
    })
    await new Promise((r) => setTimeout(r, 300))
    let page = res[0].data.page
    const resData = await page.$$(`.article_con>table>tbody>tr`,)
    let ret = []
    for (const item of resData) {
        let data = await item.$$eval('td', node => node.map(n => n.innerText))
        ret.push(data)
    }
    console.log(ret)
    await page.close()
})
