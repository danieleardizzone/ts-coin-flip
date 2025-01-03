(function () {
    'use strict';

    let root = document.documentElement;
    const scene = document.querySelector('.scene');
    if (scene) {
        const coin = scene.querySelector('.coin');
        if (coin) {
            updateCoinDimensions();
            window.addEventListener('resize', updateCoinDimensions);
            const flipBtn = document.getElementById('flip');
            if (flipBtn) {
                let coinCurrentFace = 'head';
                flipBtn.addEventListener('click', () => {
                    flipBtn.disabled = true;
                    const options = ['head', 'tail'];
                    const result = randomItem(options);
                    console.log(result);
                    let coinFlipping = coinFaceAnimation(coinCurrentFace, result);
                    const flipTiming = {
                        duration: 3000,
                        iterations: 1,
                        easing: "ease-in-out",
                        fill: "forwards"
                    };
                    coin.animate(coinFlipping, flipTiming).onfinish = () => {
                        flipBtn.disabled = false;
                    };
                    coinCurrentFace = result;
                });
            }
        }
    }
    function setCssLengthVariable(cssVariableName, cssVariableValue) {
        root.style.setProperty('--' + cssVariableName, cssVariableValue + 'px');
    }
    function coinBorderConstructor(coinBorder, coinCircumference, coinDiameter) {
        while (coinBorder.firstChild) {
            coinBorder.removeChild(coinBorder.firstChild);
        }
        const segmentCount = 36;
        let segmentTilt = 0;
        for (let i = 0; i < segmentCount; i++) {
            const segment = document.createElement('div');
            segment.classList.add(`coin_border_segment-${i}`);
            segment.style.transform = `translate(-50%, -50%) rotate3D(0, 1, 0, ${segmentTilt}deg) translateZ(${coinDiameter / 2}px)`;
            segment.style.width = `${coinCircumference / segmentCount}px`;
            for (let j = 0; j < 4; j++) {
                const notch = document.createElement('div');
                notch.classList.add(`coin_border_segment-${i}_notch`);
                notch.style.width = `${(coinCircumference / segmentCount) / 20}px`;
                segment.appendChild(notch);
            }
            segmentTilt = segmentTilt + 360 / segmentCount;
            coinBorder.appendChild(segment);
            console.log(coinBorder);
        }
    }
    function randomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }
    function coinFaceAnimation(currentFace, result) {
        if (currentFace === 'head' && result === 'head') {
            return [
                { transform: 'rotateY(0deg)' },
                { transform: 'rotateY(2160deg) rotateX(1800deg)' } // rotateY da 360deg + 1800deg
            ];
        }
        else if (currentFace === 'tail' && result === 'tail') {
            return [
                { transform: 'rotateY(180deg)' },
                { transform: 'rotateY(2340deg) rotateX(1800deg)' } // rotateY da 540deg + 1800deg
            ];
        }
        else if (currentFace === 'head' && result === 'tail') {
            return [
                { transform: 'rotateY(0deg)' },
                { transform: 'rotateY(1980deg) rotateX(1800deg)' } // rotateY da 180deg + 1800deg
            ];
        }
        else if (currentFace === 'tail' && result === 'head') {
            return [
                { transform: 'rotateY(180deg)' },
                { transform: 'rotateY(2160deg) rotateX(1800deg)' } // rotateY da 360deg + 1800deg
            ];
        }
        else {
            return null;
        }
    }
    function updateCoinDimensions() {
        const isMobile = window.matchMedia("(max-width: 550px)").matches;
        const coinDiameter = isMobile ? 280 : 400;
        const coinHeight = Math.floor(coinDiameter / 12);
        const coinCircumference = Math.PI * coinDiameter;
        setCssLengthVariable('coin-diameter', coinDiameter);
        setCssLengthVariable('coin-height', coinHeight);
        setCssLengthVariable('coin-circumference', coinCircumference);
        const coinBorder = document.querySelector('.coin_border');
        coinBorderConstructor(coinBorder, coinCircumference, coinDiameter);
    }

})();
//# sourceMappingURL=main.js.map
