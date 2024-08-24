import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import bipeSound from './audio/store-scanner-beep-90395.mp3';
import './barcodescanner.css';

const BarcodeScanner = ({ onDetected }) => {  // Adicionando prop onDetected
    const [isBarcodeDetected, setIsBarcodeDetected] = useState(false);

    useEffect(() => {
        let isComponentMounted = true;

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#barcode-scanner')
            },
            decoder: {
                readers: ["ean_reader"]
            }
        }, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("QuaggaJS inicializado com sucesso.");
            Quagga.start();

            Quagga.onDetected((result) => {
                if (isComponentMounted && !isBarcodeDetected) {
                    const code = result.codeResult.code;
                    onDetected(code);  // Usando o callback para enviar o código detectado
                    setIsBarcodeDetected(true);
                    playBipeSound();
                    Quagga.stop();
                }
            });
        });

        return () => {
            isComponentMounted = false;
            Quagga.stop();
        };
    }, [isBarcodeDetected, onDetected]);  // Adicione onDetected ao array de dependências

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function () {
            const img = new Image();
            img.onload = function () {
                Quagga.decodeSingle({
                    src: img.src,
                    numOfWorkers: 0,
                    inputStream: {
                        size: 800
                    },
                    decoder: {
                        readers: ["ean_reader"]
                    },
                    locate: true
                }, function (result) {
                    if (result && result.codeResult && !isBarcodeDetected) {
                        const code = result.codeResult.code;
                        onDetected(code);  // Chamando o callback aqui também
                        setIsBarcodeDetected(true);
                        playBipeSound();
                    }
                });
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    const playBipeSound = () => {
        const audio = new Audio(bipeSound);
        audio.play();
        setTimeout(() => setIsBarcodeDetected(false), 3000);
    };

    return (
        <div className='barcode'>
            <input type="file" id="barcode-input" accept="image/*" onChange={handleFileChange} />
            <div id="barcode-scanner"></div>
        </div>
    );
};

export default BarcodeScanner;
