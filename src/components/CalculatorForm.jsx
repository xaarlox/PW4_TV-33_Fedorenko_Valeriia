//Файл містить компонент CalculatorForm, який дозволяє користувачу ввести дані для подальших розрахунків

import { useState } from 'react';

const initialState = {
    nominalVoltage: '',
    totalImpedance: '',
    phaseVoltage: '',
    z1: '',
    z2: '',
    z0: '',
    shortCircuitCurrent: '',
    pulseCoefficient: '',
    thermalTime: '',
    dynamicStability: '',
    thermalStability: '',
    thermalTimeEquipment: '',
    mode: 'threePhase'
}

export function CalculatorForm({ onCalculate }) {
    const [formData, setFormData] = useState(initialState);

    //Функція, що оновлює стан відповідно до введених даних
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "mode" ? value : parseFloat(value),
        }));
    };

    //Функція, яка запобігає стандартній поведінці форми та передає введені дані у функцію onCalculate
    const handleSubmit = (event) => {
        event.preventDefault();
        onCalculate(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Тип розрахунку:</label>
                <select name="mode" value={formData.mode} onChange={handleChange}>
                    <option value="threePhase">Трифазне КЗ</option>
                    <option value="singlePhase">Однофазне КЗ</option>
                    <option value="stability">Перевірка стійкості</option>
                </select>
                </div>
                
                {formData.mode === "threePhase" && (
                    <>
                        <div className="form-group">
                            <label>Номінальна напруга U<sub>ном</sub> (кВ):</label>
                            <input type="number" name="nominalVoltage" value={formData.nominalVoltage} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Сумарний опір мережі Z<sub>сум</sub> (Ом):</label>
                            <input type="number" name="totalImpedance" value={formData.totalImpedance} onChange={handleChange} required />
                        </div>
                    </>
                )}

                {formData.mode === "singlePhase" && (
                    <>
                        <div className="form-group">
                            <label>Фазна напруга U<sub>ф</sub> (кВ):</label>
                            <input type="number" name="phaseVoltage" value={formData.phaseVoltage} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Опір прямої послідовності Z<sub>1</sub> (Ом):</label>
                            <input type="number" name="z1" value={formData.z1} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Опір зворотної послідовності Z<sub>2</sub> (Ом):</label>
                            <input type="number" name="z2" value={formData.z2} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Опір нульової послідовності Z<sub>0</sub> (Ом):</label>
                            <input type="number" name="z0" value={formData.z0} onChange={handleChange} required />
                        </div>
                    </>
                )}

                {formData.mode === "stability" && (
                    <>
                        <div className="form-group">
                            <label>Струм КЗ (I<sub>КЗ</sub>) (кА):</label>
                            <input type="number" name="shortCircuitCurrent" value={formData.shortCircuitCurrent} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Ударний коефіцієнт (k<sub>уд</sub>):</label>
                            <input type="number" name="pulseCoefficient" value={formData.pulseCoefficient} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Тривалість КЗ (t) (с):</label>
                            <input type="number" name="thermalTime" value={formData.thermalTime} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Динамічна стійкість обладнання (i<sub>дин</sub>) (кА):</label>
                            <input type="number" name="dynamicStability" value={formData.dynamicStability} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Термічна стійкість обладнання (I<sub>т</sub>) (кА):</label>
                            <input type="number" name="thermalStability" value={formData.thermalStability} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Час термічної стійкості обладнання (t<sub>т</sub>) (с):</label>
                            <input type="number" name="thermalTimeEquipment" value={formData.thermalTimeEquipment} onChange={handleChange} required />
                        </div>
                    </>
                )}
                <button type="submit">Розрахувати</button>
        </form>
    );
}