document.addEventListener('DOMContentLoaded', () => {
    // セクション要素
    const loginSection = document.getElementById('login-section');
    const createAccountSection = document.getElementById('create-account-section');
    const testSection = document.getElementById('test-section');
    const resultSection = document.getElementById('result-section');

    // ログインフォームとボタン
    const loginForm = document.getElementById('login-form');
    const loginIdInput = document.getElementById('login-id');
    const loginPwInput = document.getElementById('login-pw');
    const loginMessage = loginSection.querySelector('.message');

    // アカウント作成リンクとボタン
    const createAccountLink = document.getElementById('create-account-link');
    const startTestBtn = document.getElementById('start-test-btn');

    // クイズ要素
    const testQuestion = document.getElementById('test-question');
    const testOptions = document.getElementById('test-options');
    const testInput = document.getElementById('test-input');
    const testSubmitBtn = document.getElementById('test-submit-btn');
    const testFeedback = document.getElementById('test-feedback');

    // 結果セクション
    const resultMessage = resultSection.querySelector('.result-message');

    // データと状態
    const CORRECT_ID = 'yarimasune114514';
    const CORRECT_PW = 'yajusenpaiikisugi810yarimasune';
    let isLoggedIn = false;
    let quizState = 0;
    let wrongAnswers = 0;
    const questions = [
        {
            q: "「真夏の夜の淫夢」に先輩が出演したのは第何章ですか？",
            type: 'choices',
            options: ['A.三章', 'B.四章', 'C.二章'],
            answer: 'B.四章'
        },
        {
            q: "先輩に関係する数値はどれ？",
            type: 'choices',
            options: ['A.946178', 'B.370075', 'C.114514'],
            answer: 'C.114514'
        },
        {
            q: "先輩の代表的な言葉を一言入力しなさい。(不正解となる場合は入力の仕方を変えるか別の解答に変更してください)",
            type: 'text',
            answers: [
                'やりますねぇ', 'やりますねえ', 'やりますね', 'やりますねー',
                'んあー', 'んあーっ', 'んあ',
                'いいよこいよ', 'いいよこいよ！', '114514', '良いよ来いよ', '良いよこいよ',
                'いきすぎぃ', 'いきすぎい', 'いきすぎ', 'いきすぎぃ！', 'イきすぎぃ', 'イきすぎい', 'イきすぎ', 'イきすぎぃ！'
            ]
        }
    ];

    // 画面切り替え関数
    const showSection = (section) => {
        const sections = [loginSection, createAccountSection, testSection, resultSection];
        sections.forEach(s => s.classList.remove('active'));
        section.classList.add('active');
    };

    // 初期表示
    showSection(loginSection);

    // ログイン処理
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = loginIdInput.value;
        const pw = loginPwInput.value;
        if (id === CORRECT_ID && pw === CORRECT_PW) {
            // 正しいIDとPWでログインした場合の処理
            showSection(resultSection);
            resultMessage.textContent = 'おめでとう。\nこれで君は野獣ファミリーの一員です。';
            
            // 音声ファイルを再生
            const audio = new Audio('yarimasune.mp3');
            audio.play();

            // 5秒後に指定のファイルに遷移
            setTimeout(() => {
                window.location.href = 'compgam810.html';
            }, 5000); // 5000ミリ秒 = 5秒
        } else {
            loginMessage.textContent = 'Invalid ID or Password.';
        }
    });

    // アカウント作成画面への遷移
    createAccountLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(createAccountSection);
    });

    // 適性検査開始
    startTestBtn.addEventListener('click', () => {
        quizState = 0;
        wrongAnswers = 0;
        loadQuestion();
        showSection(testSection);
    });

    // クイズ出題関数
    const loadQuestion = () => {
        const currentQuestion = questions[quizState];
        testQuestion.textContent = `Test No.${quizState + 1}\n${currentQuestion.q}`;
        testFeedback.textContent = '';
        testOptions.innerHTML = '';
        testInput.style.display = 'none';
        testSubmitBtn.style.display = 'block';

        if (currentQuestion.type === 'choices') {
            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(option));
                testOptions.appendChild(button);
            });
        } else if (currentQuestion.type === 'text') {
            testInput.style.display = 'block';
            testInput.value = '';
            testSubmitBtn.addEventListener('click', () => checkAnswer(testInput.value));
        }
    };

    // 解答チェック
    const checkAnswer = (userAnswer) => {
        const currentQuestion = questions[quizState];
        let isCorrect = false;

        if (currentQuestion.type === 'choices') {
            isCorrect = (userAnswer === currentQuestion.answer);
        } else if (currentQuestion.type === 'text') {
            isCorrect = currentQuestion.answers.includes(userAnswer.toLowerCase());
        }

        if (isCorrect) {
            testFeedback.textContent = '';
            quizState++;
            if (quizState < questions.length) {
                loadQuestion();
            } else {
                // クイズ全問正解時の処理（IDとPWの表示のみ）
                showSection(resultSection);
                resultMessage.textContent = `【正解】\nID: ${CORRECT_ID}\nPW: ${CORRECT_PW}\n\nメモするかコピーしたらサイトをリロードしてログインしてください。`;
            }
        } else {
            wrongAnswers++;
            if (wrongAnswers >= 2) {
                showSection(resultSection);
                resultMessage.textContent = 'ここはあなたの来る場所ではない。';
            } else {
                testFeedback.textContent = '不正解。もう一度やり直してください。';
                if (currentQuestion.type === 'text') {
                    testInput.value = '';
                }
            }
        }
    };
});
