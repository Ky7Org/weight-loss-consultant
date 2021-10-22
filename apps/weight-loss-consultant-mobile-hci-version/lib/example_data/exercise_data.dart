


import 'dart:math';

import 'package:weight_loss_consultant_mobile_hci_version/models/exercise_model.dart';

class ExerciseList {
  static final _random =  Random();
  static int next(int min, int max) => min + _random.nextInt(max - min);
  //Abs exercise
  static var jumpingJacks = ExerciseModel(
      'JUMPING JACKS',
      '20s',
      'https://www.youtube.com/watch?v=2W4ZNSwoW_4',
      'assets/exercise/jumpingJack.jpg',
      'Start with your feet together before and your arms by your sides, then jump up with your feet apart and your hand overhead'
          '.\nReturn to the start position then do the next rep.This exercise provides a full-body workout and works all your large muscle groups.',
  294);
  static var abdominalCrunches = ExerciseModel(
      'ABDOMINAL CRUNCHES',
      "x16",
      "https://www.youtube.com/watch?v=RUNrHkbP4Pc",
      "assets/exercise/abdominalCrunches.jpg",
      "Lie on your back with your knees bent and your arms stretched forward."
          "\nThen lift your upper body off the floor.Hold for a few seconds and slowly return.\nIt primarily works the rectus abdominal muscle and the obliques.",
      next(50, 200)
  );
  static var russianTwist = ExerciseModel(
      "RUSSIAN TWIST",
      "x20",
      "https://www.youtube.com/watch?v=DJQGX2J4IVw",
      "assets/exercise/russianTwist.jpg",
      "Sit on the floor with your knees bent, feet lifted a little bit and back tilted backwards."
          "\nThen hold your hands together and twist from sideto side.",
      next(50, 200));
  static var mountainClimper = ExerciseModel(
      "MOUNTAIN CLIMBER",
      "x20",
      "https://www.youtube.com/watch?v=wQq3ybaLZeA",
      "assets/exercise/mountainCliimber.jpg",
      "Start in the push-up position. Bend your right knee towards your chest and keep your left leg straight,"
          " then quickly switch from one leg to the other.\n This exercise strengthens multiple muscle groups.",next(50, 200));
  static var heelTouch = ExerciseModel(
      "HEEL TOUCH",
      "x20",
      "https://www.youtube.com/watch?v=9bR-elyolBQ",
      "assets/exercise/heelTouch.jpg",
      "Lie on the ground with your legs bent and your arms by your sides."
          "\n Slightly lift your upper body off the floor and make your hands alternately reach your heels.",next(50, 200));
  static var legPraises = ExerciseModel(
      "LEG RAISES",
      "x16",
      "https://www.youtube.com/watch?v=dGKbTKLnym4",
      "assets/exercise/legRaise.jpg",
      "Lie down on your back, and put your hands beneath your hips for support."
          "\nThen lift your legs up until they form a right angle with the floor.\nSlowly bring your legs back down and repeat the exercise.",next(50, 200));
  static var plank = ExerciseModel(
      "PLANK",
      "20s",
      "https://www.youtube.com/watch?v=Fcbw82ykBvY",
      "assets/exercise/plank.jpg",
      "Lie on the floor with your toes and forearms on the ground."
          " Keep your body straight and hold this position as long as you can.\nThis Exercise strengthens the abdomen, back and shoulders",next(50, 200));
  static var cobraStretch = ExerciseModel(
      "COBRA STRETCH",
      "30s",
      "https://www.youtube.com/watch?v=z21McHHOpAg",
      "assets/exercise/cobraStretch.jpg",
      "Lie down on your stomach and bend your elbows with your hands beneath your shoulders."
          "\nThen push your chest up off the ground as far as possible. Hold this position for seconds.",next(50, 200));
  static var spineLumbarTwistStretchLeft = ExerciseModel(
      "SPINE LUMBAR TWISTS STRETCH LEFT",
      "30s",
      "https://www.youtube.com/watch?v=ryNlb_0GmAw",
      "assets/exercise/spineLumbarTwistStretchLeft.jpg",
      "Lie on your back with your legs extended. Lift your left up and use your right hand to pull your left knee to the right,"
          " but keep your other arm extended to the side on the floor.\nHold this position for a few seconds.",next(50, 200));
  static var spineLumbarTwistStretchRight = ExerciseModel(
      "SPINE LUMBAR TWIST STRETCH RIGHT",
      "30s",
      "https://www.youtube.com/watch?v=ryNlb_0GmAw",
      "assets/exercise/spineLumbarTwistStretchLeft.jpg",
      "Lie on your back with your legs extended.\nLift your right leg up and use your left hand to pull your right knee to the left,"
          " but keep your other arm extend to side on the floor.\nHold This position for a few seconds.",next(50, 200));

  //Chest exercise
  static var inclinePushups = ExerciseModel(
      "INCLINE PUSH-UP",
      "30s",
      "https://www.youtube.com/watch?v=3WUUeM07i_Q",
      "assets/exercise/inclinePushups.jpg",
      "Start in the regular push-up position but with your hand elevated on a chair or bench."
          "\nThen push your body up down using your arm strength.\nRemember to keep your body straight.",next(50, 200));
  static var kneePushUps = ExerciseModel(
      "KNEE PUSH-UP",
      "x12",
      "https://www.youtube.com/watch?v=jWxvty2KROs",
      "assets/exercise/kneePushUps.jpg",
      "Start in the regular push-up position, then let your knees touch the floor and the raise your feet up off the floor."
          "\n Next push your body up and down.",next(50, 200));
  static var pushUps = ExerciseModel(
      "PUSH-UPS",
      "x10",
      "https://www.youtube.com/watch?v=R08gYyypGto",
      "assets/exercise/pushUps.jpg",
      "Lay prone on the ground with arms supporting your body.\nKeep your body straight while raising and lowering your body with your arms"
          ".\nThis exercise works the chest, shoulders, triceps, back, and legs.",next(50, 200));
  static var wideArmPushUps = ExerciseModel(
      "WIDE ARM PUSH-UPS",
      "x10",
      "https://www.youtube.com/watch?v=pQUsUHvyoI0",
      "assets/exercise/wideArmPushUps.jpg",
      "Start i="
          "Start in the regular push-up position but with your hands spread wider than you shoulders."
          "\nThen push your body up and down.Remember to keep your body straight.",next(50, 200));
  static var boxPushUps = ExerciseModel(
      "BOX PUSH-UPS",
      "x12",
      "https://www.youtube.com/watch?v=dcJVA2sBPqw",
      "assets/exercise/boxPushUps.jpg",
      "Start on all fours with your knees under your butt and your hands directly under your shoulders."
          "\nBend your elbows and do a push-up. Return to the start position and repeat.",next(50, 200));
  static var hinduPushUps = ExerciseModel(
      "HINDU PUSH-UPS",
      "x10",
      "https://www.youtube.com/watch?v=HE0ijmUc6Og",
      "assets/exercise/hinduPushUps.jpg",
      "Start with your hands and feet touching the floor, body bent and butt up in upside down V shape."
          "\nThen bend your elbows to bring your body towards the floor.\nWhen your body is close to the floor, raise your upper body as far as possible. Then return to the original position and repeat.",next(50, 200));
  static var chestStretch = ExerciseModel(
      "CHEST STRETCH",
      "20s",
      "https://www.youtube.com/watch?v=NS64IgKUyeY",
      "assets/exercise/chestStretch.jpg",
      "Find a doorway, take a lunge position in the doorway with your arms on the doorframe and your elbows a little lower than your shoulders,"
          " then slowly bring your chest forward.\nHold this position for 30-40 seconds. Then slowly come out of it, bring your arms down and do a couple of shoulders rolls.\nDon't pull your head forward, and keep your neck relaxed.",next(50, 200));

  //Arm exercise
  static var armRaises = ExerciseModel(
      "ARM RAISES",
      "30s",
      "https://www.youtube.com/watch?v=Bqvmyni_sKQ",
      "assets/exercise/armRaises.jpg",
      "Stand on the floor with your arms extended straight forward at shoulder height."
          "\nRaise your arms above your head. Return to the start position and repeat.",next(50, 200));
  static var sideArmRaise = ExerciseModel(
      "SIDE ARM RAISE",
      "30s",
      "https://www.youtube.com/watch?v=YslHgg2E-Ro",
      "assets/exercise/armRaises.jpg",
      "Stand with your feet shoulder width apart.\n Raise your arms to the sides at shoulder height,"
          " then put them down.\n Repeat the exercise. Keep your arms straight during the exercise.",next(50, 200));
  static var tricepsDips = ExerciseModel(
      "TRICEPS DIPS",
      "x10",
      "https://www.youtube.com/watch?v=JhX1nBnirNw",
      "assets/exercise/tricepsDips.jpg",
      "For the start position, sit on the chair."
          " Then move your hip off the chair with your hands holding the edge of the chair.\nSlowly bend and stretch your arms to make your body go up and down. This is a great exercise for the triceps.",next(50, 200));
  static var armCirclesClockwise = ExerciseModel(
      "ARM CIRCLES CLOCKWISE",
      "30s",
      "https://www.youtube.com/watch?v=Lha66p0ZXUc",
      "assets/exercise/armCirclesClockwise.jpg",
      "Stand on the floor with your arms extended straight to the sides at shoulder height."
          "\nMove your arm clockwise in circles fast.\nTry to do it as fast as you can.\nIt's a great exercise for the deltoid muscle",next(50, 200));
  static var armCirclesCounterClockwise = ExerciseModel(
      "ARM CIRCLES COUNTERCLOCKWISE",
      "30s",
      "https://www.youtube.com/watch?v=Lha66p0ZXUc",
      "assets/exercise/armCirclesClockwise.jpg",
      "Stand on the floor with your arms extend straight out to the sides at shoulder height."
          "\nMove your arms counterclockwise in circles fast.\nTry to do it as fast as you can.\nIt's a great exercise for the deltoid muscle.",next(50, 200));
  static var diamondPushUps = ExerciseModel(
      "DIAMOND PUSH-UPS",
      "x6",
      "https://www.youtube.com/watch?v=UCmqw3kKZ38",
      "assets/exercise/diamondPushUps.webp",
      "Start in the push-up position. Make a diamond shape with your forefingers and thumbs together under your chest."
          "\nThen push your body up and down.Remember to keep your body straight.",next(50, 200));
  static var chestPressPulse = ExerciseModel(
      "CHEST PRESS PULSE",
      "16s",
      "https://www.youtube.com/watch?v=Fz4oo1vFo9M",
      "assets/exercise/chestPressPulse.webp",
      "Hold your forearms together at shoulder height and bend your elbows with your hands together to make an L shape."
          "\nThen lift your forearms up and down.",next(50, 200));
  static var legBarbellCurlRight = ExerciseModel(
      "LEG BARBELL CURL RIGHT",
      "x8",
      "https://www.youtube.com/watch?v=3kZS8HVFquk",
      "assets/exercise/legBarbellCurlRight.jpg",
      "Stand against a wall. Lift your left leg up, lean forward and grab underneath your left angle with your right hand."
          "\nBring the ankle up towards the shoulder as mush as you can, then lower it and repeat the exercise.",next(50, 200));
  static var legBarbellCurlLeft = ExerciseModel(
      "LEG BARBELL CURL LEFT",
      "x8",
      "https://www.youtube.com/watch?v=3kZS8HVFquk",
      "assets/exercise/legBarbellCurlRight.jpg",
      "Stand against a wall. Lift your right leg up, lean forward and grab underneath your right angle with your left hand."
          "\nBring the ankle up towards the shoulder as mush as you can, then lower it and repeat the exercise.",next(50, 200));
  static var diagonalPlank = ExerciseModel(
      "DIAGONAL PLANK",
      "x10",
      "https://www.youtube.com/watch?v=OGfFtF-dhrk",
      "assets/exercise/diagonalPlank.jpg",
      "Start in the straight arm plank position.\nLift your right arm and left leg until they are parallel with the ground."
          "\nReturn to the start position and repeat with the other side.",next(50, 200));
  static var punches = ExerciseModel(
      "PUNCHES",
      "30s",
      "https://www.youtube.com/watch?v=reeBHtZJ1ts",
      "assets/exercise/punches.jpg",
      "Stand with on of your leg forward and your knees bent slightly. Bend your elbows and clench your fists in front of your face."
          "\nExtend one arm forward with the palm facing the floor. Take the arm back and repeat with the other arm.",next(50, 200));
  static var inchworms = ExerciseModel(
      "INCHWORMS",
      "x8",
      "https://www.youtube.com/watch?v=ZY2ji_Ho0dA",
      "assets/exercise/inchworms.jpg",
      "Start with your feet shoulder width apart.\nBend your body and walk your hands in front of you as far as you can,"
          " then walk your hands back. Repeat the exercise.",next(50, 200));
  static var wallPushUps = ExerciseModel(
      "WALL PUSH-UPS",
      "x12",
      "https://www.youtube.com/watch?v=EOf3cGIQpA4",
      "assets/exercise/wallPushUps.webp",
      "Stand in front of a wall one big step away from it. Then put your hands out straight towards the wall and lean against it."
          " Lift your heels.\nSlowly bend your elbows and press your upper body towards the wall. Push back and repeat the exercise."
          " Remember to keep your body straight.",next(50, 200));
  static var tricpesStretchLeft = ExerciseModel(
      "TRICEPS STRETCH LEFT",
      "30s",
      "https://www.youtube.com/watch?v=L9IGOcrdcFk",
      "assets/exercise/tricpesStretchLeft.webp",
      "Put your left hand on your back, use your right hand to grab your left elbow and gently pull it. Hold this position for a few seconds",next(50, 200));
  static var tricpesStretchRight = ExerciseModel(
      "TRICEPS STRETCH LEFT",
      "30s",
      "https://www.youtube.com/watch?v=L9IGOcrdcFk",
      "assets/exercise/tricpesStretchLeft.webp",
      "Put your right hand on your back, use your left hand to grab your left elbow and gently pull it. Hold this position for a few seconds",next(50, 200));
  static var standingBicepsStretchLeft = ExerciseModel(
      "STANDING BICEPS STRETCH LEFT",
      "30s",
      "https://www.youtube.com/watch?v=jw8EXo5h0ec",
      "assets/exercise/standingBicepsStretchLeft.jpg",
      "Stand with your left arm close to the wall.\nExtend your left arm and put your left hand on the wall, then gently turn your body to the right.",next(50, 200));
  static var standingBicepsStretchRight = ExerciseModel(
      "STANDING BICEPS STRETCH LEFT",
      "30s",
      "https://www.youtube.com/watch?v=jw8EXo5h0ec",
      "assets/exercise/standingBicepsStretchLeft.jpg",
      "Stand with your right arm close to the wall.\nExtend your right arm and put your right hand on the wall, then gently turn your body to the left.",next(50, 200));

  //Leg Exercise
  static var sideHop = ExerciseModel(
      "SIDE HOP",
      "30s",
      "https://www.youtube.com/watch?v=nYmUEJIBj3c",
      "assets/exercise/sideHop.jpg",
      "Stand on the floor, put your hands in front of you from side to side.",next(50, 200));
  static var squats = ExerciseModel(
      "SQUATS",
      "x12",
      "https://www.youtube.com/watch?v=42bFodPahBU",
      "assets/exercise/squats.jpg",
      "Stand with your feet shoulder width apart and your arms stretched forward, then lower your body until your things are parallel with the floor."
          "\n Your knees should be extends in the same direction as your toes. Return to the start position and do the next rep.\nThis work the thighs,"
          " hips buttocks, quads, hamstring and lower body.",next(50, 200));
  static var sideLyingLegLiftLeft = ExerciseModel(
      "SIDE-LYING LEG LIFT LEFT",
      'x12',
      "https://www.youtube.com/watch?v=VlwBJE1WtOQ",
      "assets/exercise/sideLyingLegLiftLeft.jpg",
      "Lie down on your side with your head rested on your right arm. Lift your upper leg up and return to the start position."
          "\nMake sure your left leg goes straight up and down during the exercise.\nIt's a great exercise for the gluteus.",next(50, 200));
  static var sideLyingLegLiftRight = ExerciseModel(
      "SIDE-LYING LEG LIFT RIGHT",
      'x12',
      "https://www.youtube.com/watch?v=VlwBJE1WtOQ",
      "assets/exercise/sideLyingLegLiftLeft.jpg",
      "Lie down on your side with your head rested on your left arm. Lift your upper leg up and return to the start position."
          "\nMake sure your right leg goes straight up and down during the exercise.\nIt's a great exercise for the gluteus.",next(50, 200));
  static var backwardLunge = ExerciseModel(
      "BACKWARD LUNGE",
      "x14",
      "https://www.youtube.com/watch?v=_LGpDtENZ5U",
      "assets/exercise/backwardLunge.webp",
      "Stand with your feet shoulder width apart and your hands on your hips."
          "\nStep a big step backward with your right leg and lower your body until your left thigh is parallel to the floor."
          "Return and repeat with the other side",next(50, 200));
  static var donkeyKicksLeft = ExerciseModel(
      "DONKEY KICKS LEFT",
      "x16",
      "https://www.youtube.com/watch?v=4ranVQDqlaU",
      "assets/exercise/donkeyKicksLeft.jpg",
      "Start on all fours with your knees under your butt and your hands under your shoulders.\n"
          "Then lift your left leg and squeeze your butt as much as you can. Go back to the start position and repeat the exercise.",next(50, 200));
  static var donkeyKicksRight = ExerciseModel(
      "DONKEY KICKS RIGHT",
      "x16",
      "https://www.youtube.com/watch?v=4ranVQDqlaU",
      "assets/exercise/donkeyKicksLeft.jpg",
      "Start on all fours with your knees under your butt and your hands under your shoulders.\n"
          "Then lift your right leg and squeeze your butt as much as you can. Go back to the start position and repeat the exercise.",next(50, 200));
  static var leftQuadStretchWithWall = ExerciseModel(
      "LEFT QUAD STRETCH WITH WALL",
      "30s",
      "https://www.youtube.com/watch?v=TfcRyYf7WLg",
      "assets/exercise/leftQuadStretchWithWall.jpg",
      "Stand with your right hand on the wall. Bend your left leg and grasp your ankle or toes to bring your left calf close to your left thigh.\n"
          "Hold this position.",next(50, 200));
  static var rightQuadStretchWithWall = ExerciseModel(
      "RIGHT QUAD STRETCH WITH WALL",
      "30s",
      "https://www.youtube.com/watch?v=TfcRyYf7WLg",
      "assets/exercise/leftQuadStretchWithWall.jpg",
      "Stand with your left hand on the wall. Bend your right leg and grasp your ankle or toes to bring your right calf close to your right thigh.\n"
          "Hold this position.",next(50, 200));
  static var kneeToChestStretchLeft = ExerciseModel(
      "KNEE TO CHEST STRETCH LEFT",
      "30s",
      "https://www.youtube.com/watch?v=bJms9YyjoBI",
      "assets/exercise/kneeToChestStretchLeft.webp",
      "Lie on the floor with your legs extended. Lift your left knee up and grap it with both hands.\n"
          "Pull your left knee towards your chest as much you can while keeping your right leg straight on the ground.\n"
          "Hold this position for a few seconds,",next(50, 200));
  static var kneeToChestStretchRight = ExerciseModel(
      "KNEE TO CHEST STRETCH RIGHT",
      "30s",
      "https://www.youtube.com/watch?v=bJms9YyjoBI",
      "assets/exercise/kneeToChestStretchLeft.webp",
      "Lie on the floor with your legs extended. Lift your right knee up and grap it with both hands.\n"
          "Pull your right knee towards your chest as much you can while keeping your left leg straight on the ground.\n"
          "Hold this position for a few seconds,",next(50, 200));
  static var wallCalfRaise = ExerciseModel(
      "WALL CALF RAISE",
      "x12",
      "https://www.youtube.com/watch?v=GQa_N7wft7M",
      "assets/exercise/wallCalfRaise.jpg",
      "Stand straight with your hands on the wall and feet shoulder width apart.\n"
          "Lift your heels and stand on your toes.Then drop your heel down. Repeat the exercise.",next(50, 200));
  static var sumoSquatCalfRaisesWithWall = ExerciseModel(
      "SUMO SQUAT CALF RAISES WITH WALL",
      "x12",
      "https://www.youtube.com/watch?v=Hcy81KUTIZ8",
      "assets/exercise/sumoSquatCalfRaisesWithWall.jpg",
      "Stand with your hands on the wall and your feet a little than shoulder width apart.\n"
          "Lower your body until your thighs are parallel to the floor."
          "Lift your heels up and down.",next(50, 200));
  static var calfStretchLeft = ExerciseModel(
      "CALF STRETCH LEFT",
      "30s",
      "https://www.youtube.com/watch?v=mJOGKTYUAzY",
      "assets/exercise/calfStretchLeft.jpg",
      "Stand one big step away in front of a wall.\n"
          "Step forwards with your right foot and push the wall with your hands.\n"
          "Please make sure your left leg is fully extended and your can feel your left calf stretching. Hold this position for a few seconds.",next(50, 200));
  static var calfStretchRight = ExerciseModel(
      "CALF STRETCH RIGHT",
      "30s",
      "https://www.youtube.com/watch?v=mJOGKTYUAzY",
      "assets/exercise/calfStretchLeft.jpg",
      "Stand one big step away in front of a wall.\n"
          "Step forwards with your left foot and push the wall with your hands.\n"
          "Please make sure your left leg is fully extended and your can feel your right calf stretching. Hold this position for a few seconds.",next(50, 200));

  //Shoulder & Back Exercise
  static var rhomboidPulls = ExerciseModel(
      "RHOMBOID PULLS",
      "x14",
      "https://www.youtube.com/watch?v=DEyDbzSudEU",
      "assets/exercise/rhomboidPulls.gif",
      "Stand with your feet shoulder width apart.\n"
          "Raise your arms parallel to the ground, and bend your elbows."
          "Pull your elbows back and squeeze your shoulder blades.\nRepeat this exercise.",next(50, 200));
  static var sideLyingFloorStretchLeft = ExerciseModel(
      "SIDE-LYING FLOOR STRETCH LEFT",
      "30s",
      "https://www.youtube.com/watch?v=DMlSdmsHEeI",
      "assets/exercise/sideLyingFloorStretchLeft.webp",
      "Lie on your right side with your right knee\n"
          "slightly bent in front of you and your left leg stretched behind the right leg.\n"
          "Straighten your left arm over your head and gently pull on your left wrist to stretch the left side of your body.\n"
          "Hold this position for a few seconds.",next(50, 200));
  static var sideLyingFloorStretchRight = ExerciseModel(
      "SIDE-LYING FLOOR STRETCH RIGHT",
      "30s",
      "https://www.youtube.com/watch?v=DMlSdmsHEeI",
      "assets/exercise/sideLyingFloorStretchLeft.webp",
      "Lie on your left side with your left knee\n"
          "slightly bent in front of you and your right leg stretched behind the left leg.\n"
          "Straighten your right arm over your head and gently pull on your right wrist to stretch the right side of your body.\n"
          "Hold this position for a few seconds.",next(50, 200));
  static var armScissors = ExerciseModel(
      "SHOULDER & BACK",
      "30s",
      "https://www.youtube.com/watch?v=pFrJQ-MyL10",
      "assets/exercise/armScissors.jpg",
      "Stand upright with your feet shoulder width apart.\n"
          "Stretch your arms in front of you at shoulder height with one arm overlap the other in the shape of the letter X,"
          "and then spread them apart.\n"
          "Switch arms, and repeat the exercise.",next(50, 200));
  static var catCowPose = ExerciseModel(
      "CAT COW POSE",
      "30s",
      "https://www.youtube.com/watch?v=w_UKcI1Ftn8",
      "assets/exercise/catCowPose.jpg",
      "Start on all fours with your knees under your butt and your hands directly under your shoulders.\n"
          "Then take a breath and make your belly fall down, shoulders roll back and head come up towards the ceiling.\n"
          "As you exhale, curve your back upward and let your head come down. Repeat the exercise.\n"
          "Do it slowly with each step of this exercise.",next(50, 200));
  static var proneTricepsPushUps = ExerciseModel(
      "PRONE TRICEPS PUSH UPS",
      "x14",
      "https://www.youtube.com/watch?v=Rr43jMaoJ9g",
      "assets/exercise/proneTricepsPushUps.jpg",
      "Lie on your stomach with your hands underneath your shoulders and your elbows bent.\n"
          "Slightly raise your chest up, and then go back to the start position.\nRepeat this exercise.",next(50, 200));
  static var reclinedRhomboidSqueezes = ExerciseModel(
      "RECLINED RHOMBOID SQUEEZES",
      "x12",
      "https://www.youtube.com/watch?v=olv2Sv9DwmA",
      "assets/exercise/reclinedRhomboidSqueezes.gif",
      "Sit with your knees bent. Slightly lean your upper body back.\n"
          "Stretch your arms in front of you, then pull your elbows back to make your elbows at a 90 degree angle and squeeze your shoulder blades.\n"
          "Repeat this exercise.",next(50, 200));
  static var childPose = ExerciseModel(
      "CHILD'S POSE",
      "30s",
      "https://www.youtube.com/watch?v=DMwRPGMPB10",
      "assets/exercise/childPose.jpg",
      "Start with your knees and hands on the floor. Put your hands a little forward, widen your knees and put your toes together.\n"
          "Take a breath, then exhale and sit back. Try to make your butt touch your heels. Relax your elbows, make your forehead touch the floor"
          " adnh try to lower your chest close to the floor. Hold this position.\n"
          "Keep your arms stretched forward as you sit back. Make sure there "
          "is enough space between your shoulders and ears during the exercise",next(50, 200));

  static List<ExerciseModel> listExercise = [
    jumpingJacks,
    abdominalCrunches,
    russianTwist,
    mountainClimper,
    heelTouch,
    legPraises,
    plank,
    cobraStretch,
    spineLumbarTwistStretchLeft,
    spineLumbarTwistStretchRight,
    inclinePushups,
    kneePushUps,
    pushUps,
    wideArmPushUps,
    boxPushUps,
    hinduPushUps,
    chestStretch,
    armRaises,
    sideArmRaise,
    tricepsDips,
    armCirclesClockwise,
    armCirclesCounterClockwise,
    diamondPushUps,
    chestPressPulse,
    legBarbellCurlLeft,
    legBarbellCurlRight,
    diagonalPlank,
    punches,
    inchworms,
    wallPushUps,
    tricpesStretchLeft,
    tricpesStretchRight,
    standingBicepsStretchLeft,
    sideHop,
    squats,
    sideLyingLegLiftLeft,
    sideLyingLegLiftRight,
    backwardLunge,
    donkeyKicksLeft,
    donkeyKicksRight,
    leftQuadStretchWithWall,
    rightQuadStretchWithWall,
    kneeToChestStretchLeft,
    kneeToChestStretchRight,
    wallCalfRaise,
    sumoSquatCalfRaisesWithWall,
    calfStretchLeft,
    calfStretchRight,
    rhomboidPulls,
    sideLyingFloorStretchLeft,
    sideLyingFloorStretchRight,
    armScissors,
    catCowPose,
    proneTricepsPushUps,
    reclinedRhomboidSqueezes,
    childPose,
  ];
}
