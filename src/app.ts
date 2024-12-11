
let root = document.documentElement;

const scene = document.querySelector('.scene') as HTMLElement;

if (scene) {

    const coin = scene.querySelector('.coin') as HTMLElement;

    if (coin) {

        const coinDiameter: number = 200;
        const coinHeight: number = coinDiameter / 10;
        const coinCircumference: number = Math.PI * coinDiameter;

        setCssLengthVariable('coin-diameter', coinDiameter);
        setCssLengthVariable('coin-height', coinHeight);
        setCssLengthVariable('coin-circumference', coinCircumference);

        const coinBorder = coin.querySelector('.coin_border') as HTMLElement;

        coinBorderConstructor(coinBorder, coinCircumference, coinDiameter);

        let currentCoinFace = "rotate3d(0, 1, 0, 0)"

    }

}

function setCssLengthVariable(cssVariableName: string, cssVariableValue: number): void {

    root.style.setProperty('--' + cssVariableName, cssVariableValue + 'px')

}

function coinBorderConstructor(coinBorder: HTMLElement, coinCircumference: number, coinDiameter: number): void {

    const segmentCount = 36;

    let segmentTilt = 0;


    for (let i = 0; i < segmentCount; i++) {

        const segment = document.createElement('div')
        segment.classList.add(`coin_border_segment-${i}`)

        segment.style.transform = `translate(-50%, -50%) rotate3D(0, 1, 0, ${segmentTilt}deg) translateZ(${coinDiameter / 2}px)`
        segment.style.width = `${coinCircumference / segmentCount}px`

        segmentTilt = segmentTilt + 360 / segmentCount;

        coinBorder.appendChild(segment);
    }

}