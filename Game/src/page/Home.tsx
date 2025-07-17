import { useState } from "react";
import './style/Home.css'

const Home = () => {
    const [playerCount, setPlayerCount] = useState<number | null>(null);
    const [inputCount, setInputCount] = useState("");
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [showRole, setShowRole] = useState(false);
    const [shuffledRoles, setShuffledRoles] = useState<string[]>([]);

    const startGame = () => {
        const count = parseInt(inputCount);
        if (!isNaN(count) && count > 1) {
            const roles = generateRoles(count);
            localStorage.setItem("playerCount", count.toString());
            localStorage.setItem("roles", JSON.stringify(roles));
            setShuffledRoles(roles);
            setPlayerCount(count);
        } else {
            alert("ใส่จำนวนผู้เล่นมากกว่า 1 คน");
        }
    };

    const generateRoles = (count: number): string[] => {
        const ghostCount = Math.max(1, Math.floor(count / 4)); // อย่างน้อย 1 ผี
        const roles = Array(ghostCount).fill("ผี").concat(
            Array(count - ghostCount).fill("ชาวบ้าน")
        );
        return roles.sort(() => Math.random() - 0.5); // สุ่มตำแหน่ง
    };

    const nextPlayer = () => {
        setShowRole(false);
        setCurrentPlayer((prev) => prev + 1);
    };

    if (playerCount === null) {
        return (
            <div className="Home-num-player">
                <div className="Home-num-card">
                    <h1>Onside Ghost</h1>
                    <h2 >จำนวนผู้เล่น</h2>
                    <div style={{display: 'flex',gap: '10px'}}>
                        <input
                            type="number"
                            value={inputCount}
                            onChange={(e) => setInputCount(e.target.value)}
                            className="input-count-player"
                        />
                        <button
                            onClick={startGame}
                            className="Btn"
                        >
                            เริ่มเกม
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (currentPlayer >= playerCount) {
        return (
            <div >
                <h2 >แจกบทบาทครบแล้ว!</h2>
            </div>
        );
    }

    return (
        <div >
            <h2 >ผู้เล่นคนที่ {currentPlayer + 1}</h2>

            {!showRole ? (
                <button
                    onClick={() => setShowRole(true)}

                >
                    ดูบทบาทของคุณ
                </button>
            ) : (
                <>
                    <div >
                        {shuffledRoles[currentPlayer]}
                    </div>
                    <button
                        onClick={nextPlayer}

                    >
                        ปิดและส่งให้คนถัดไป
                    </button>
                </>
            )}
        </div>
    );
};

export default Home;
