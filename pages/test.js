import { useState } from "react";

export default function Index() {
    const [number, setNumber] = useState(null);
    const [result, setResult] = useState("");

    const clickHanlder = (num) => {
        setResult(num % 2 === 0 ? "Genap" : "Ganjil");
    };

    return (
        <form>
            <label htmlFor="tes"></label>
            <input type="number" onChange={(e) => setNumber(e.target.value)} />

            <div onClick={() => clickHanlder(number)}>Cek</div>

            {result ? result : ""}
        </form>
    );
}
