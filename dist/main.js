(function () {
    'use strict';

    let root = document.documentElement;
    const scene = document.querySelector('.scene');
    if (scene) {
        const coin = scene.querySelector('.coin');
        if (coin) {
            const coinDiameter = 200;
            const coinHeight = coinDiameter / 10;
            const coinCircumference = Math.PI * coinDiameter;
            setCssLengthVariable('coin-diameter', coinDiameter);
            setCssLengthVariable('coin-height', coinHeight);
            setCssLengthVariable('coin-circumference', coinCircumference);
            const coinBorder = coin.querySelector('.coin_border');
            coinBorderConstructor(coinBorder, coinCircumference, coinDiameter);
            const flipBtn = document.getElementById('flip');
            if (flipBtn) {
                let currentCoinFace = 'head';
                flipBtn.addEventListener('click', () => {
                    flipBtn.disabled = true;
                    const options = ['head', 'tail'];
                    const result = randomItem(options);
                    console.log(result);
                    coin.classList.remove('flip-head-to-head', 'flip-head-to-tail', 'flip-tail-to-tail', 'flip-tail-to-head');
                    void coin.offsetWidth;
                    coinFlipAnimation(result, currentCoinFace, coin);
                    coin.addEventListener('animationend', () => {
                        flipBtn.disabled = false;
                    }, { once: true });
                });
            }
        }
    }
    function setCssLengthVariable(cssVariableName, cssVariableValue) {
        root.style.setProperty('--' + cssVariableName, cssVariableValue + 'px');
    }
    function coinBorderConstructor(coinBorder, coinCircumference, coinDiameter) {
        const segmentCount = 36;
        let segmentTilt = 0;
        for (let i = 0; i < segmentCount; i++) {
            const segment = document.createElement('div');
            segment.classList.add(`coin_border_segment-${i}`);
            segment.style.transform = `translate(-50%, -50%) rotate3D(0, 1, 0, ${segmentTilt}deg) translateZ(${coinDiameter / 2}px)`;
            segment.style.width = `${coinCircumference / segmentCount}px`;
            segmentTilt = segmentTilt + 360 / segmentCount;
            coinBorder.appendChild(segment);
        }
    }
    function randomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }
    function coinFlipAnimation(result, currentCoinFace, coin) {
        if (result === 'head') {
            if (currentCoinFace === result) {
                coin.classList.add('flip-head-to-head');
            }
            else {
                coin.classList.add('flip-tail-to-head');
                currentCoinFace = 'head';
            }
        }
        else {
            if (currentCoinFace === result) {
                coin.classList.add('flip-tail-to-tail');
            }
            else {
                coin.classList.add('flip-head-to-tail');
                currentCoinFace = 'tail';
            }
        }
    }

})();
//# sourceMappingURL=main.js.map
