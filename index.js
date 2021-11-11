const { expect } = require('@playwright/test');
const { chromium } = require('playwright') 

const shops = [
    {
        vendor:'Microsoft',
        url:'https://www.xbox.com/es-es/configure/8WJ714N3RBTL',
        checkStok: async ({page}) =>{
           // const page = await browser.newPage()
            //await page.goto(url)
            const content = await page.textContent('[aria-label="Finalizar la compra del pack"]')
            return content.includes('Sin existencias')  === false
            

        }
    },
    {
        vendor:'Game',
        url:'https://www.game.es/OFERTAS/PACK/PACKS/XBOX-SERIES-X-CONTROLLER-XBOX/P03362',
        checkStok: async ({page}) =>{
           
            const content = await page.textContent('.product-quick-actions')
            return content.includes('Producto no disponible')  === false
           

        }
    }

    
]
;(async() => {
    const browser = await chromium.launch({headless:false})
   
    for (const shop of shops) {
        const {checkStok, vendor, url} = shop

        const page = await browser.newPage()
        await page.goto(url)
        const hasStock = await checkStok({page})
        await page.screenshot({path:`screenshots/${vendor}.png`})
        console.log(`${vendor} has stock: ${hasStock}`)
        await page.close()
    }

    

    await browser.close()
})()


