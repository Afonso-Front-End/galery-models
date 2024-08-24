import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import bipeSound from './audio/store-scanner-beep-90395.mp3';
import './barcodescanner.css';
import useAcesso from '../components/home/useAcesso';


const scanner = ({ onDetected }) => {
    const { userData } = useAcesso()

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
        });

        if (userData) {
            Quagga.onDetected((result) => {
                if (isComponentMounted && !isBarcodeDetected) {
                    const code = result.codeResult.code;
                    onDetected(code);
                    setIsBarcodeDetected(true);
                    playBipeSound(); // Chama a função para reproduzir o som de bipe
                    Quagga.stop(); // Parar a detecção após a primeira detecção
                    // handleAdicionarScaner(code); // Chama handleAdicionarScaner() após a atualização de product_code
                }
            });
        }

        return () => {
            isComponentMounted = false;
            Quagga.stop();
        };
    }, [userData, isBarcodeDetected, onDetected]); // Executa quando userData ou isBarcodeDetected mudam


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
                        onDetected(code);
                        setDetectedBarcode(code);
                        setIsBarcodeDetected(true);
                        playBipeSound();

                    } else {
                        setDetectedBarcode("Código de Barras não detectado.");
                    }
                });
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    const playBipeSound = () => {
        const audio = new Audio(bipeSound); // Cria uma nova instância de áudio com o arquivo de áudio de bipe
        audio.play(); // Reproduz o som de bipe
        setTimeout(() => setIsBarcodeDetected(false), 3000); // Liberar para a próxima detecção após 3 segundos
    };

    return (
        <div className='barcode'>
            <input type="file" id="barcode-input" accept="image/*" onChange={handleFileChange} />
            <div id="barcode-scanner"></div>
        </div>
    );

}
export default scanner;