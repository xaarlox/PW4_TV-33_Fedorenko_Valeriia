//Файл містить компонент Calculator, який керує всім процесом

import { useState } from 'react';
import { CalculatorForm } from './CalculatorForm';
import { ResultsDisplay } from './resultsDisplay';
import { calculateResults } from '../utils/calculateResults'
import './Calculator.css';

export default function EmissionCalculator() {
    const [results, setResults] = useState(null);

    const handleCalculate = (formData) => {
        const calculatedResults = calculateResults(formData);
        setResults(calculatedResults);
    };

    return (
        <div className="calculator-container">
            <h1>⚡ Калькулятор струмів КЗ</h1>
            <h2>Розрахунок струмів короткого замикання та стійкості</h2>
            <CalculatorForm onCalculate={handleCalculate} />
            <ResultsDisplay results={results} />
        </div>
    );
}