
let root = document.documentElement;

const scene = document.querySelector('.scene') as HTMLElement;

if (scene) {

    const coin = scene.querySelector('.coin') as HTMLElement;

    if (coin) {

        const coinDiameter: number = 250;
        const coinHeight: number = Math.floor(coinDiameter / 8.33);
        const coinCircumference: number = Math.PI * coinDiameter;

        setCssLengthVariable('coin-diameter', coinDiameter);
        setCssLengthVariable('coin-height', coinHeight);
        setCssLengthVariable('coin-circumference', coinCircumference);

        const coinBorder = coin.querySelector('.coin_border') as HTMLElement;

        coinBorderConstructor(coinBorder, coinCircumference, coinDiameter);

        const flipBtn = document.getElementById('flip') as HTMLButtonElement;

        if (flipBtn) {

            let coinCurrentFace = 'head'

            flipBtn.addEventListener('click', () => {

                flipBtn.disabled = true;

                const options: string[] = ['head', 'tail'];

                const result = randomItem(options);
                console.log(result);

                let coinFlipping: Keyframe[] | PropertyIndexedKeyframes | null = coinFaceAnimation(coinCurrentFace, result);

                const flipTiming: KeyframeAnimationOptions = {
                    duration: 3000,
                    iterations: 1,
                    easing: "ease-in-out",
                    fill: "forwards"
                };

                coin.animate(
                    coinFlipping,
                    flipTiming
                ).onfinish = () => {
                    flipBtn.disabled = false;
                };

                coinCurrentFace = result;

            });

        }

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

function randomItem(items: any[]): any | undefined {
    return items[Math.floor(Math.random() * items.length)];
}

function coinFaceAnimation(currentFace: string, result: string): Keyframe[] | PropertyIndexedKeyframes | null {
    if (currentFace === 'head' && result === 'head') {
        return [
            { transform: 'rotateY(0deg)' },
            { transform: 'rotateY(2160deg) rotateX(1800deg)' } // rotateY da 360deg + 1800deg
        ];
    } else if (currentFace === 'tail' && result === 'tail') {
        return [
            { transform: 'rotateY(180deg)' },
            { transform: 'rotateY(2340deg) rotateX(1800deg)' } // rotateY da 540deg + 1800deg
        ];
    } else if (currentFace === 'head' && result === 'tail') {
        return [
            { transform: 'rotateY(0deg)' },
            { transform: 'rotateY(1980deg) rotateX(1800deg)' } // rotateY da 180deg + 1800deg
        ];
    } else if (currentFace === 'tail' && result === 'head') {
        return [
            { transform: 'rotateY(180deg)' },
            { transform: 'rotateY(2160deg) rotateX(1800deg)' } // rotateY da 360deg + 1800deg
        ];
    } else {
        return null;
    }
}