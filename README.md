## testいろいろ

1. canvasやthreejsのテストはどうする?
    - storybookやplaywrightなどの実DOMテストがいい
2. fast-checkはどう？
    - jestで使ったみたらいい感じ、他のtest runnerとの組み合わせはできないかも？
3. storybookとplaywrightのcomponent testどっちがいい？
    - 10/10時点ではまだplaywrightはexperimentalだし7月から動いてなさそう
4. server actions系はどっち？
    - conformもplaywrightでテストしてる(それ用のアプリケーションを作って...)
    - 確かめてみる
        - 雑に実験
            - Not implemented: HTMLFormElement.prototype.requestSubmitをどう倒せばいいかわからない
            - 問題はactionに設定した関数が発火しない事←多分これが一番クリティカル
            - いやsubmitはされてるからuseFormをmockすればワンチャンある(form.onSubmitをspyしてformDataを得る？actionは発火されるの？)
        - conformさえ使わなければactionは発火するのか
            - 怪しい→https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#programmatic-form-submission
            - actionのテストできるらしい→https://github.com/company-library/company-library/pull/135/files#diff-9a0b53c432cb226a8542156613ea3522453ad19ad5acdc7252fb6076ba323b62
                - reactをcanaryにするとできた,conformも
                - ちなcanaryにしないとactionは発火しなかった
        - canaryにしないで攻略する方法は？
            - HTMLFormElementを独自実装するくらいしかない
                - やりたくない
    - 結論
        - reactをcanaryにするか、playwrightを使うかになる
