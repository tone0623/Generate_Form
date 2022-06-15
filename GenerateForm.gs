function myFunction() {
  const form = FormApp.create('印刷劣化画像 主観評価実験 2022')
      .setProgressBar(true)
      .setDescription("この度は本実験にご参加いただき、誠にありがとうございます。\nこのフォームは以下の内容で構成されています。\n\n▶︎実験の解説\n\n▶︎劣化の解説\n\n▶︎テスト問題\n\n▶︎評価実験")

  //5枚目のページ
  const fifthPage = form.addPageBreakItem();
  fifthPage.setTitle("ご協力ありがとうございました！")
      .setHelpText("以上で本実験は終了となります。\nこちらの認証番号をLancersにてお送りください\n\n認証番号【 TONE0623 】");

  //4枚目のページ
  const fourthPage = form.addPageBreakItem();
  fourthPage.setTitle("評価実験");
  form.moveItem(fourthPage.getIndex(), fifthPage.getIndex());

  const image_folder = DriveApp.getFolderById('1J46jE2zX4YPRF5ON6JWbwt3e33dCQwfS');
  var image_files = image_folder.getFiles();
  var count = 1;
  var amount = 0;
  while(image_files.hasNext()){
    tmp = image_files.next();
    amount ++ 
  }

  image_files = image_folder.getFiles();

  while(image_files.hasNext()){
    let image_file = image_files.next();
    var image_id = image_file.getId();
    var img = DriveApp.getFileById(image_id);
    var img_name = img.getName().replace('.png' ,'')
    var fourthPage_image_field = form.addImageItem().setTitle(count + '/' + amount);
    fourthPage_image_field.setImage(img);

    var fourthPage_item = form.addScaleItem();


    fourthPage_item.setTitle(img_name)
        .setRequired(true)
        .setHelpText('左の画像と比べて、右の画像の劣化は...')
        .setBounds(1, 5)
        .setLabels('全く気にならない', 'とても気になる');
    count += 1;
    form.moveItem(fourthPage_image_field.getIndex(), fifthPage.getIndex());
    form.moveItem(fourthPage_item.getIndex(), fifthPage.getIndex());
  }


  //3枚目のページ
  const thirdPage = form.addPageBreakItem();
  thirdPage.setTitle("事前テスト問題")
      .setHelpText("このページでは、事前テストを行います。\n\n▶︎全問必須回答です。\n▶︎テストの結果が70%未満の場合、実験は無効となります。\n▶︎表示された画像を見て「左の画像に比べて右の画像の劣化がどのくらい気になるか」を5段階で評価をしていただきます。\n \n事前テスト終了後、次ページから本実験が開始されます。" )
  form.moveItem(thirdPage.getIndex(), fourthPage.getIndex());

  const test_image_folder = DriveApp.getFolderById('127zY7uSwdEN0Js9iHb3CaJCmJ5mh3Zal');
  var test_image_files = test_image_folder.getFiles();
  var test_count = 1;
  var test_amount = 0;
  while(test_image_files.hasNext()){
    tmp = test_image_files.next();
    test_amount ++ 
  }

  test_image_files = test_image_folder.getFiles();


  while(test_image_files.hasNext()){
    let test_image_file = test_image_files.next();
    var test_image_id = test_image_file.getId();
    var test_img = DriveApp.getFileById(test_image_id);
    var test_img_name = test_img.getName().replace('.png' ,'')
    var thirdPage_image_field = form.addImageItem().setTitle(test_count + '/' + test_amount);
    thirdPage_image_field.setImage(test_img);

    var thirdPage_item = form.addScaleItem();


    thirdPage_item.setTitle(test_img_name)
        .setRequired(true)
        .setHelpText('左の画像と比べて、右の画像の劣化は...')
        .setBounds(1, 5)
        .setLabels('全く気にならない', 'とても気になる');
    test_count += 1;
    form.moveItem(thirdPage_image_field.getIndex(), fourthPage.getIndex());
    form.moveItem(thirdPage_item.getIndex(), fourthPage.getIndex());
  }

  
  //2枚目のページ

  const secondPage = form.addPageBreakItem();
  secondPage.setTitle("劣化の解説");
  secondPage.setHelpText("このページでは、評価していただく画像内で発生する劣化の種類について説明します。");
  form.moveItem(secondPage.getIndex(), thirdPage.getIndex());

  var discription_name = ["ランダムで発生する丸いシミ。色は4色あります。","ランダムで発生する白い汚れ。", "一定間隔で発生する黒いシミ", "一定間隔で発生する黒い横スジ", "一定間隔で発生する黒い縦スジ","一定間隔で発生する白い横スジ", "一定間隔で発生する白い縦スジ"];

  const distortion_image_folder = DriveApp.getFolderById('1vVTOPhBuzPSqD6SiQTeNvel5iCLXNOsY');
  const distortion_image_files = distortion_image_folder.getFiles();
  

  while(distortion_image_files.hasNext()){
    let distortion_image_file = distortion_image_files.next();
    var distortion_image_id = distortion_image_file.getId();
    var distortion_img = DriveApp.getFileById(distortion_image_id);
    var distortion_img_name = distortion_img.getName().replace('.png' ,'');

    var secondPage_image_field = form.addImageItem()
        .setImage(distortion_img)
        .setTitle(discription_name[Number(distortion_img_name) - 1]);

    form.moveItem(secondPage_image_field.getIndex(), thirdPage.getIndex());
  }



  //1枚目のページ
  const firstPage = form.addPageBreakItem()
      .setTitle("実験の解説")
      .setHelpText("本実験では、2枚並んだ画像を見て「左の画像に比べて右の画像の劣化がどのくらい気になるか」を5段階で評価をしていただきます。\n\n▶︎全"+ amount +"問あります\n▶︎全問必須回答です。");
  form.moveItem(firstPage.getIndex(), secondPage.getIndex());

}

