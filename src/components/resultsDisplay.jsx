//Файл містить компонент ResultsDisplay, який відповідає за відображення результатів розрахунків після того, як вони були обчислені

export function ResultsDisplay({ results }) {
    if (!results || !results.mode) return null;

    const { mode } = results;

    return (
        <div className="results-container">
            <h3>Результати розрахунку</h3>
            
            {mode === "threePhase" && (
                <>
                    <div className="formula">
                        I<sub>КЗ3</sub> = U<sub>ном</sub> / (√3 × Z<sub>сум</sub>)
                    </div>
                    <p>Струм трифазного КЗ (I<sub>КЗ3</sub>):{' '}<span className="output-value">{results.I_kz3} кА</span></p>
                </>
            )}

            {mode === "singlePhase" && (
                <>
                    <div className="formula">
                        I<sub>КЗ1</sub> = 3 × U<sub>ф</sub> / (Z<sub>1</sub> + Z<sub>2</sub> + Z<sub>0</sub>)
                    </div>
                    <p>Струм однофазного КЗ (I<sub>КЗ1</sub>):{' '}<span className="output-value">{results.I_kz1} кА</span></p>
                </>
            )}

            {mode === "stability" && (
                <>
                    <div className="formula">
                        Розрахунок динамічної та термічної стійкості:
                    </div>
                    <p>Ударний струм КЗ (i<sub>уд</sub>):{' '}<span className="output-value">{results.i_ud} кА</span></p>
                    <p>Значення теплового імпульсу (B<sub>K</sub>):{' '}<span className="output-value">{results.B_k} кА²·с</span></p>
                    <h4>Динамічна стійкість</h4>
                    <p>Умова: i<sub>уд</sub> ≤ i<sub>дин</sub></p>
                    <p>Результат:{' '}<span className={`stability-result ${results.dynamicCheck ? 'success' : 'fail'}`}>{results.dynamicCheck ? 'Виконано' : 'Не виконано'}</span></p>
                    <h4>Термічна стійкість</h4>
                    <p>Умова: B<sub>K</sub> ≤ I<sub>т</sub>² × t<sub>т</sub></p>
                    <p>Результат:{' '}<span className={`stability-result ${results.thermalCheck ? 'success' : 'fail'}`}>{results.thermalCheck ? 'Виконано' : 'Не виконано'}</span></p>
                </>
            )}
        </div>
    );
}