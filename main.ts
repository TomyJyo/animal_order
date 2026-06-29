input.onButtonPressed(Button.A, function () {
    customEditor.addMemo("何番目かを入力表示")
    if (bol_Answering) {
        int_Input += 1
        if (int_AniNam < int_Input) {
            int_Input = 1
        }
        basic.showNumber(int_Input)
    }
})
input.onButtonPressed(Button.B, function () {
    customEditor.addMemo("ﾎﾞﾀﾝAで指定した数字で決定")
    bol_Answering = false
})
let int_AniChk = 0
let int_ChkAll = 0
let int_Input = 0
let bol_Answering = false
let str_AniNam = ""
let int_AniNam = 0
customEditor.addMemo("動物の名前を順番を記憶してマイコンが指定した動物が何番目だったかを当てるゲーム")
customEditor.addMemo("「配列」の基本的な使い方のプログラミング事例")
customEditor.addMemo("何番目かを間違えた時、すべて正解回答した時はゲームオーバー")
customEditor.addMemo("ゲームオーバー後の再起動はボタンＡ+Ｂで押す")
basic.showLeds(`
    # . . . #
    . # # # .
    # . # . #
    # # . # #
    . . # . .
    `)
basic.pause(1000)
let ary_AniNam = [
"Mouse",
"Cat",
"Dog",
"Bear",
"Panda"
]
customEditor.addMemo("配列に格納されている順番をシャッフルする")
customEditor.addMemo("前：ary_AniNam → 後：ary_AniMix")
let ary_AniMix: string[] = []
customEditor.addMemo("ary_AniChk は回答済み(1)か、そうでない(0)かを示す配列")
let ary_AniChk: number[] = []
int_AniNam = ary_AniNam.length
for (let index = 0; index < int_AniNam; index++) {
    str_AniNam = ary_AniNam.removeAt(randint(0, ary_AniNam.length - 1))
    ary_AniMix.push(str_AniNam)
    ary_AniChk.push(0)
}
game.setScore(0)
music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
music.rest(music.beat(BeatFraction.Half))
music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
music.rest(music.beat(BeatFraction.Half))
music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
music.rest(music.beat(BeatFraction.Half))
music.play(music.tonePlayable(523, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
customEditor.addMemo("動物名を順番に表示してプレーヤーが記憶する")
customEditor.addMemo("「M」は Memorize (記憶する)の頭文字")
basic.showString("M")
basic.pause(2000)
basic.clearScreen()
let int_Count = 0
for (let index = 0; index < int_AniNam; index++) {
    str_AniNam = ary_AniMix[int_Count]
    for (let index = 0; index < 2; index++) {
        basic.showString("" + (str_AniNam))
    }
    basic.showString("--")
    int_Count += 1
}
basic.forever(function () {
    customEditor.addMemo("全件回答済みかのチェック")
    int_ChkAll = 0
    int_Count = 0
    for (let index = 0; index < int_AniNam; index++) {
        if (ary_AniChk[int_Count] == 1) {
            int_ChkAll += 1
        }
        int_Count += 1
    }
    if (int_AniNam == int_ChkAll) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Ode), music.PlaybackMode.InBackground)
        game.gameOver()
    }
    customEditor.addMemo("マイコンが配列から動物名を乱数で選んで表示")
    customEditor.addMemo("「R」は Remember (思い出す)の頭文字")
    basic.showString("R")
    basic.pause(3000)
    basic.clearScreen()
    customEditor.addMemo("未回答の動物が出るまで繰り返す")
    int_Count = randint(0, ary_AniMix.length - 1)
    int_AniChk = ary_AniChk[int_Count]
    while (int_AniChk == 1) {
        int_Count = randint(0, ary_AniMix.length - 1)
        int_AniChk = ary_AniChk[int_Count]
    }
    str_AniNam = ary_AniMix[int_Count]
    ary_AniChk[int_Count] = 1
    for (let index = 0; index < 2; index++) {
        basic.showString("" + (str_AniNam))
    }
    customEditor.addMemo("何番目かの入力待ち")
    int_Input = 0
    basic.showString("?")
    bol_Answering = true
    while (bol_Answering) {
        basic.pause(100)
    }
    basic.clearScreen()
    customEditor.addMemo("プレーヤーが入力された数字で配列から動物名を表示")
    str_AniNam = ary_AniMix[int_Input - 1]
    basic.showString("" + (str_AniNam))
    customEditor.addMemo("マイコンの指定とプレーヤー入力が一致しているかの判定")
    if (int_Count + 1 == int_Input) {
        basic.showIcon(IconNames.Happy)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Birthday), music.PlaybackMode.UntilDone)
        basic.pause(1000)
        game.addScore(1)
    } else {
        basic.showIcon(IconNames.Sad)
        basic.pause(1000)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
        game.gameOver()
    }
})
