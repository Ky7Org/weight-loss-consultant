
class Exercise {
  String name;
  String unit;
  String videoPath;
  String thumbnailPath;
  String details;

  Exercise(this.name, this.unit, this.videoPath, this.thumbnailPath,
      this.details);
}

class ExerciseList {
  //Abs exercise
  static var jumpingJacks = Exercise(
      'JUMPING JACKS',
      'ABS',
      'https://www.youtube.com/watch?v=2W4ZNSwoW_4',
      'https://thumbs.dreamstime.com/z/woman-doing-jumping-jacks-exercise-flat-vector-woman-doing-jumping-jacks-exercise-flat-vector-illustration-isolated-white-223249502.jpg',
      'Start with your feet together before and your arms by your sides, then jump up with your feet apart and your hand overhead'
          './nReturn to the start position then do the next rep.This exercise provides a full-body workout and works all your large muscle groups.');
  static var abdominalCrunches = Exercise(
      'ABDOMINAL CRUNCHES',
      "ABS",
      "https://www.youtube.com/watch?v=RUNrHkbP4Pc",
      "https://st4.depositphotos.com/7755898/25181/v/1600/depositphotos_251817744-stock-illustration-man-doing-crunches-in-the.jpg",
      "Lie on your back with your knees bent and your arms stretched forward."
          "/nThen lift your upper body off the floor.Hold for a few seconds and slowly return./nIt primarily works the rectus abdominal muscle and the obliques.");
  static var russianTwist = Exercise(
      "RUSSIAN TWIST",
      "ABS",
      "https://www.youtube.com/watch?v=DJQGX2J4IVw",
      "https://image.shutterstock.com/shutterstock/photos/795671356/display_1500/stock-vector-girl-doing-russian-twist-and-crunches-exercises-vector-illustration-795671356.jpg",
      "Sit on the floor with your knees bent, feet lifted a little bit and back tilted backwards."
          "/nThen hold your hands together and twist from side to side.");
  static var mountainClimper = Exercise(
      "MOUNTAIN CLIMBER",
      "ABS",
      "https://www.youtube.com/watch?v=wQq3ybaLZeA",
      "https://media.istockphoto.com/vectors/step-of-doing-the-mountain-climber-exercise-by-healthy-woman-vector-id957699448?k=20&m=957699448&s=612x612&w=0&h=kxdGeANir4ASYaCyuXkeHkoL-VZTPQ9eOIRKjuhuCWc=",
      "Start in the push-up position. Bend your right knee towards your chest and keep your left leg straight,"
          " then quickly switch from one leg to the other./n This exercise strengthens multiple muscle groups.");
  static var heelTouch = Exercise(
      "HEEL TOUCH",
      "ABS",
      "https://www.youtube.com/watch?v=9bR-elyolBQ",
      "https://thumbs.dreamstime.com/z/basic-rgb-223180663.jpg",
      "Lie on the ground with your legs bent and your arms by your sides."
          "/n Slightly lift your upper body off the floor and make your hands alternately reach your heels.");
  static var legPraises = Exercise(
      "LEG RAISES",
      "ABS",
      "https://www.youtube.com/watch?v=dGKbTKLnym4",
      "https://thumbs.dreamstime.com/z/art-illustration-201076249.jpg",
      "Lie down on your back, and put your hands beneath your hips for support."
          "/nThen lift your legs up until they form a right angle with the floor./nSlowly bring your legs back down and repeat the exercise.");
  static var plank = Exercise(
      "PLANK",
      "ABS",
      "https://www.youtube.com/watch?v=Fcbw82ykBvY",
      "https://thumbs.dreamstime.com/b/art-illustration-201075973.jpg",
      "Lie on the floor with your toes and forearms on the ground."
          " Keep your body straight and hold this position as long as you can./nThis Exercise strengthens the abdomen, back and shoulders");
  static var cobraStretch = Exercise(
      "COBRA STRETCH",
      "ABS",
      "https://www.youtube.com/watch?v=z21McHHOpAg",
      "https://thumbs.dreamstime.com/z/art-illustration-200250748.jpg",
      "Lie down on your stomach and bend your elbows with your hands beneath your shoulders."
          "/nThen push your chest up off the ground as far as possible. Hold this position for seconds.");
  static var spineLumbarTwistStretchLeft = Exercise(
      "SPINE LUMBAR TWISTS STRETCH LEFT",
      "ABS",
      "https://www.youtube.com/watch?v=ryNlb_0GmAw",
      "https://thumbs.dreamstime.com/b/basic-rgb-220571869.jpg",
      "Lie on your back with your legs extended. Lift your left up and use your right hand to pull your left knee to the right,"
          " but keep your other arm extended to the side on the floor./nHold this position for a few seconds.");
  static var spineLumbarTwistStretchRight = Exercise(
      "SPINE LUMBAR TWIST STRETCH RIGHT",
      "ABS",
      "https://www.youtube.com/watch?v=ryNlb_0GmAw",
      "https://thumbs.dreamstime.com/b/basic-rgb-220571869.jpg",
      "Lie on your back with your legs extended./nLift your right leg up and use your left hand to pull your right knee to the left,"
          " but keep your other arm extend to side on the floor./nHold This position for a few seconds.");

  //Chest exercise
  static var inclinePushups = Exercise(
      "INCLINE PUSH-UP",
      "CHEST BEGINNER",
      "https://www.youtube.com/watch?v=3WUUeM07i_Q",
      "https://thumbs.dreamstime.com/z/art-illustration-198574282.jpg",
      "Start in the regular push-up position but with your hand elevated on a chair or bench."
          "/nThen push your body up down using your arm strength./nRemember to keep your body straight.");
  static var kneePushUps = Exercise(
      "KNEE PUSH-UP",
      "CHEST",
      "https://www.youtube.com/watch?v=jWxvty2KROs",
      "https://previews.123rf.com/images/lioputra/lioputra2011/lioputra201100082/158979264-modified-knee-push-ups-exercise-flat-vector-illustration-isolated-on-white-background-workout-charac.jpg",
      "Start in the regular push-up position, then let your knees touch the floor and the raise your feet up off the floor."
          "/n Next push your body up and down.");
  static var pushUps = Exercise(
      "PUSH-UPS",
      "CHEST",
      "https://www.youtube.com/watch?v=R08gYyypGto",
      "https://us.123rf.com/450wm/lioputra/lioputra2010/lioputra201000171/157886721-man-character-doing-push-ups-flat-vector-illustration-isolated-on-different-layers.jpg?ver=6",
      "Lay prone on the ground with arms supporting your body./nKeep your body straight while raising and lowering your body with your arms"
          "./nThis exercise works the chest, shoulders, triceps, back, and legs.");
  static var wideArmPushUps = Exercise(
      "WIDE ARM PUSH-UPS",
      "CHEST",
      "https://www.youtube.com/watch?v=pQUsUHvyoI0",
      "https://www.wikihow.com/images/d/db/Do-Wide-Pushups-Step-11.jpg",
      "Start i="
          "Start in the regular push-up position but with your hands spread wider than you shoulders."
          "/nThen push your body up and down.Remember to keep your body straight.");
  static var boxPushUps = Exercise(
      "BOX PUSH-UPS",
      "CHEST",
      "https://www.youtube.com/watch?v=dcJVA2sBPqw",
      "https://us.123rf.com/450wm/lioputra/lioputra2010/lioputra201000171/157886721-man-character-doing-push-ups-flat-vector-illustration-isolated-on-different-layers.jpg?ver=6",
      "Start on all fours with your knees under your butt and your hands directly under your shoulders."
          "/nBend your elbows and do a push-up. Return to the start position and repeat.");
  static var hinduPushUps = Exercise(
      "HINDU PUSH-UPS",
      "CHEST",
      "https://www.youtube.com/watch?v=HE0ijmUc6Og",
      "https://www.wikihow.com/images/thumb/a/a4/Do-Hindu-Pushups-Step-5-Version-2.jpg/v4-460px-Do-Hindu-Pushups-Step-5-Version-2.jpg.webp",
      "Start with your hands and feet touching the floor, body bent and butt up in upside down V shape."
          "/nThen bend your elbows to bring your body towards the floor./nWhen your body is close to the floor, raise your upper body as far as possible. Then return to the original position and repeat.");
  static var chestStretch = Exercise(
      "CHEST STRETCH",
      "CHEST",
      "https://www.youtube.com/watch?v=NS64IgKUyeY",
      "https://thumbs.dreamstime.com/z/woman-doing-chest-opener-forward-bend-stretch-exercise-woman-doing-chest-opener-forward-bend-stretch-exercise-flat-220574876.jpg",
      "Find a doorway, take a lunge position in the doorway with your arms on the doorframe and your elbows a little lower than your shoulders,"
          " then slowly bring your chest forward./nHold this position for 30-40 seconds. Then slowly come out of it, bring your arms down and do a couple of shoulders rolls./nDon't pull your head forward, and keep your neck relaxed.");

  //Arm exercise
  static var armRaises = Exercise(
      "ARM RAISES",
      "ARM",
      "https://www.youtube.com/watch?v=Bqvmyni_sKQ",
      "https://thumbs.dreamstime.com/z/arm-raise-exercise-man-sport-clothes-doing-warm-up-arm-raise-exercise-man-sport-clothes-doing-warm-up-workout-idea-155128603.jpg",
      "Stand on the floor with your arms extended straight forward at shoulder height."
          "/nRaise your arms above your head. Return to the start position and repeat.");
  static var sideArmRaise = Exercise(
      "SIDE ARM RAISE",
      "ARM",
      "https://www.youtube.com/watch?v=YslHgg2E-Ro",
      "https://thumbs.dreamstime.com/z/arm-raise-exercise-man-sport-clothes-doing-warm-up-arm-raise-exercise-man-sport-clothes-doing-warm-up-workout-idea-155128603.jpg",
      "Stand with your feet shoulder width apart./n Raise your arms to the sides at shoulder height,"
          " then put them down./n Repeat the exercise. Keep your arms straight during the exercise.");
  static var tricepsDips = Exercise(
      "TRICEPS DIPS",
      "ARM",
      "https://www.youtube.com/watch?v=JhX1nBnirNw",
      "https://thumbs.dreamstime.com/z/man-doing-bench-tricep-dips-flat-vector-man-doing-bench-tricep-dips-flat-vector-illustration-isolated-white-background-215404254.jpg ",
      "For the start position, sit on the chair."
          " Then move your hip off the chair with your hands holding the edge of the chair./nSlowly bend and stretch your arms to make your body go up and down. This is a great exercise for the triceps.");
  static var armCirclesClockwise = Exercise(
      "ARM CIRCLES CLOCKWISE",
      "ARM",
      "https://www.youtube.com/watch?v=Lha66p0ZXUc",
      "https://thumbs.dreamstime.com/z/arm-circles-exercise-man-sport-clothes-doing-warm-up-arm-circles-exercise-man-sport-clothes-doing-warm-up-workout-154498822.jpg",
      "Stand on the floor with your arms extended straight to the sides at shoulder height."
          "/nMove your arm clockwise in circles fast./nTry to do it as fast as you can./nIt's a great exercise for the deltoid muscle");
  static var armCirclesCounterClockwise = Exercise(
      "ARM CIRCLES COUNTERCLOCKWISE",
      "ARM",
      "https://www.youtube.com/watch?v=Lha66p0ZXUc",
      "https://thumbs.dreamstime.com/z/arm-circles-exercise-man-sport-clothes-doing-warm-up-arm-circles-exercise-man-sport-clothes-doing-warm-up-workout-154498822.jpg",
      "Stand on the floor with your arms extend straight out to the sides at shoulder height."
          "/nMove your arms counterclockwise in circles fast./nTry to do it as fast as you can./nIt's a great exercise for the deltoid muscle.");
  static var diamondPushUps = Exercise(
      "DIAMOND PUSH-UPS",
      "ARM",
      "https://www.youtube.com/watch?v=UCmqw3kKZ38",
      "https://image.shutterstock.com/image-vector/woman-doing-diamond-pyramid-push-260nw-1964669092.jpg",
      "Start in the push-up position. Make a diamond shape with your forefingers and thumbs together under your chest."
          "/nThen push your body up and down.Remember to keep your body straight.");
  static var chestPressPulse = Exercise(
      "CHEST PRESS PULSE",
      "ARM",
      "https://www.youtube.com/watch?v=Fz4oo1vFo9M",
      "https://image.shutterstock.com/image-vector/resistance-band-chest-press-exercise-260nw-1854189535.jpg",
      "Hold your forearms together at shoulder height and bend your elbows with your hands together to make an L shape."
          "/nThen lift your forearms up and down.");
  static var legBarbellCurlRight = Exercise(
      "LEG BARBELL CURL RIGHT",
      "ARM",
      "https://www.youtube.com/watch?v=3kZS8HVFquk",
      "https://images.assetsdelivery.com/compings_v2/jameschipper/jameschipper1609/jameschipper160900023.jpg",
      "Stand against a wall. Lift your left leg up, lean forward and grab underneath your left angle with your right hand."
          "/nBring the ankle up towards the shoulder as mush as you can, then lower it and repeat the exercise.");
  static var legBarbellCurlLeft = Exercise(
      "LEG BARBELL CURL LEFT",
      "ARM",
      "https://www.youtube.com/watch?v=3kZS8HVFquk",
      "https://images.assetsdelivery.com/compings_v2/jameschipper/jameschipper1609/jameschipper160900023.jpg",
      "Stand against a wall. Lift your right leg up, lean forward and grab underneath your right angle with your left hand."
          "/nBring the ankle up towards the shoulder as mush as you can, then lower it and repeat the exercise.");
  static var diagonalPlank = Exercise(
      "DIAGONAL PLANK",
      "ARM",
      "https://www.youtube.com/watch?v=OGfFtF-dhrk",
      "https://thumbs.dreamstime.com/z/diagonal-plank-exercise-white-background-vector-illustration-diagonal-plank-exercise-149606761.jpg",
      "Start in the straight arm plank position./nLift your right arm and left leg until they are parallel with the ground."
          "/nReturn to the start position and repeat with the other side.");
  static var punches = Exercise(
      "PUNCHES",
      "ARM",
      "https://www.youtube.com/watch?v=reeBHtZJ1ts",
      "https://thumbs.dreamstime.com/z/man-throwing-punch-vector-illustration-decorative-design-man-throwing-punch-vector-illustration-decorative-design-188379248.jpg",
      "Stand with on of your leg forward and your knees bent slightly. Bend your elbows and clench your fists in front of your face."
          "/nExtend one arm forward with the palm facing the floor. Take the arm back and repeat with the other arm.");
  static var inchworms = Exercise(
      "INCHWORMS",
      "ARM",
      "https://www.youtube.com/watch?v=ZY2ji_Ho0dA",
      "https://previews.123rf.com/images/lioputra/lioputra2106/lioputra210600062/170642817-man-doing-inchworms-walkouts-exercise-flat-vector-illustration-isolated-on-white-background.jpg",
      "Start with your geet shoulder width apart./nBend your body and walk your hands in front of you as far as you can,"
          " then walk your hands back. Repeat the exercise.");
  static var wallPushUps = Exercise(
      "WALL PUSH-UPS",
      "ARM",
      "https://www.youtube.com/watch?v=EOf3cGIQpA4",
      "https://www.activehealth.sg/hs-fs/hubfs/Active%20Health%20Website/Read/2020/Strength%20Training%20for%20Seniors%207.jpg?width=800&name=Strength%20Training%20for%20Seniors%207.jpg",
      "Stand in front of a wall one big step away from it. Then put your hands out straight towards the wall and lean against it."
          " Lift your heels./nSlowly bend your elbows and press your upper body towards the wall. Push back and repeat the exercise."
          " Remember to keep your body straight.");
  static var tricpesStretchLeft = Exercise(
      "TRICEPS STRETCH LEFT",
      "ARM",
      "https://www.youtube.com/watch?v=L9IGOcrdcFk",
      "https://image.shutterstock.com/image-vector/man-doing-overhead-triceps-stretch-260nw-2011131950.jpg",
      "Put your left hand on your back, use your right hand to grab your left elbow and gently pull it. Hold this position for a few seconds");
  static var tricpesStretchRight = Exercise(
      "TRICEPS STRETCH LEFT",
      "ARM",
      "https://www.youtube.com/watch?v=L9IGOcrdcFk",
      "https://image.shutterstock.com/image-vector/man-doing-overhead-triceps-stretch-260nw-2011131950.jpg",
      "Put your right hand on your back, use your left hand to grab your left elbow and gently pull it. Hold this position for a few seconds");
  static var standingBicepsStretchLeft = Exercise(
      "STANDING BICEPS STRETCH LEFT",
      "ARM",
      "https://www.youtube.com/watch?v=jw8EXo5h0ec",
      "https://2.bp.blogspot.com/-KZ8QGWJ718c/WzeMxDMXg-I/AAAAAAAAGKs/HJXiOTgbTMEGzqeos86tT55fIxmtQWoTwCEwYBhgL/s1600/Screenshot_20180630-175023__01.jpg",
      "Stand with your left arm close to the wall./nExtend your left arm and put your left hand on the wall, then gently turn your body to the right.");
  static var standingBicepsStretchRight = Exercise(
      "STANDING BICEPS STRETCH LEFT",
      "ARM",
      "https://www.youtube.com/watch?v=jw8EXo5h0ec",
      "https://2.bp.blogspot.com/-KZ8QGWJ718c/WzeMxDMXg-I/AAAAAAAAGKs/HJXiOTgbTMEGzqeos86tT55fIxmtQWoTwCEwYBhgL/s1600/Screenshot_20180630-175023__01.jpg",
      "Stand with your right arm close to the wall./nExtend your right arm and put your right hand on the wall, then gently turn your body to the left.");
  static var sideHop = Exercise(
      "SIDE HOP",
      "LEG",
      "https://www.youtube.com/watch?v=nYmUEJIBj3c",
      "https://www.spotebi.com/wp-content/uploads/2016/08/side-to-side-hops-exercise-illustration-spotebi.jpg",
      "Stand on the floor, put your hands in front of you from side to side.");
  static var squats = Exercise(
      "SQUATS",
      "LEG",
      "https://www.youtube.com/watch?v=42bFodPahBU",
      "https://st4.depositphotos.com/7755898/25316/v/1600/depositphotos_253168048-stock-illustration-man-making-squats-exercise-for.jpg",
      "Stand with your feet shoulder width apart and your arms stretched forward, then lower your body until your things are parallel with the floor."
          "/n Your knees should be extends in the same direction as your toes. Return to the start position and do the next rep./nThis work the thighs,"
          " hips buttocks, quads, hamstring and lower body.");
  static var sideLyingLegLiftLeft = Exercise(
      "SIDE-LYING LEG LIFT LEFT",
      'LEG',
      "https://www.youtube.com/watch?v=VlwBJE1WtOQ",
      "https://media.istockphoto.com/vectors/woman-doing-side-leg-raise-exercise-with-lying-in-2-step-on-blue-mat-vector-id1147313549?k=20&m=1147313549&s=170667a&w=0&h=tnwtjZ4z_UG2v3fvh4GDcj69SuAOU8vQ3KWlWk6r-K4=",
      "Lie down on your side with your head rested on your right arm. Lift your upper leg up and return to the start position."
          "/nMake sure your left leg goes straight up and down during the exercise./nIt's a great exercise for the gluteus.");
  static var sideLyingLegLiftRight = Exercise(
      "SIDE-LYING LEG LIFT RIGHT",
      'LEG',
      "https://www.youtube.com/watch?v=VlwBJE1WtOQ",
      "https://media.istockphoto.com/vectors/woman-doing-side-leg-raise-exercise-with-lying-in-2-step-on-blue-mat-vector-id1147313549?k=20&m=1147313549&s=170667a&w=0&h=tnwtjZ4z_UG2v3fvh4GDcj69SuAOU8vQ3KWlWk6r-K4=",
      "Lie down on your side with your head rested on your left arm. Lift your upper leg up and return to the start position."
          "/nMake sure your right leg goes straight up and down during the exercise./nIt's a great exercise for the gluteus.");
  static var backwardLunge = Exercise(
      "BACKWARD LUNGE",
      "LEG",
      "https://www.youtube.com/watch?v=_LGpDtENZ5U",
      "https://image.shutterstock.com/image-vector/sport-woman-doing-exercise-dumbbell-260nw-1735126829.jpg",
      "Stand with your feet shoulder width apart and your hands on your hips."
          "/nStep a big step backward with your right leg and lower your body until your left thigh is parallel to the floor."
          "Return and repeat with the other side");
  static var donkeyKicksLeft = Exercise(
      "DONKEY KICKS LEFT",
      "LEG",
      "https://www.youtube.com/watch?v=4ranVQDqlaU",
      "https://thumbs.dreamstime.com/b/fitness-exercises-your-better-workout-donkey-kicks-motivation-163529823.jpg",
      "Start on all fours with your knees under your butt and your hands under your shoulders./n"
          "Then lift your left leg and squeeze your butt as much as you can. Go back to the start position and repeat the exercise.");
  static var donkeyKicksRight = Exercise(
      "DONKEY KICKS RIGHT",
      "LEG",
      "https://www.youtube.com/watch?v=4ranVQDqlaU",
      "https://thumbs.dreamstime.com/b/fitness-exercises-your-better-workout-donkey-kicks-motivation-163529823.jpg",
      "Start on all fours with your knees under your butt and your hands under your shoulders./n"
          "Then lift your right leg and squeeze your butt as much as you can. Go back to the start position and repeat the exercise.");
  static var leftQuadStretchWithWall = Exercise(
      "LEFT QUAD STRETCH WITH WALL",
      "LEG",
      "https://www.youtube.com/watch?v=TfcRyYf7WLg",
      "https://media.istockphoto.com/vectors/exercise-diagram-about-quadriceps-stretch-while-standing-vector-id1154569404?k=20&m=1154569404&s=612x612&w=0&h=drQ0y70yzGFxPeiqUOnZtJ7_a3zuqcXLUet7EVTwJ_I=",
      "Stand with your right hand on the wall. Bend your left leg and grasp your ankle or toes to bring your left calf close to your left thigh./n"
          "Hold this position.");
  static var rightQuadStretchWithWall = Exercise(
      "RIGHT QUAD STRETCH WITH WALL",
      "LEG",
      "https://www.youtube.com/watch?v=TfcRyYf7WLg",
      "https://media.istockphoto.com/vectors/exercise-diagram-about-quadriceps-stretch-while-standing-vector-id1154569404?k=20&m=1154569404&s=612x612&w=0&h=drQ0y70yzGFxPeiqUOnZtJ7_a3zuqcXLUet7EVTwJ_I=",
      "Stand with your left hand on the wall. Bend your right leg and grasp your ankle or toes to bring your right calf close to your right thigh./n"
          "Hold this position.");
  static var kneeToChestStretchLeft = Exercise(
      "KNEE TO CHEST STRETCH LEFT",
      "LEG",
      "https://www.youtube.com/watch?v=bJms9YyjoBI",
      "https://image.shutterstock.com/image-vector/man-doing-knee-chest-lower-260nw-1991346713.jpg",
      "Lie on the floor with your legs extended. Lift your left knee up and grap it with both hands./n"
          "Pull your left knee towards your chest as much you can while keeping your right leg straight on the ground./n"
          "Hold this position for a few seconds,");
  static var kneeToChestStretchRight = Exercise(
      "KNEE TO CHEST STRETCH RIGHT",
      "LEG",
      "https://www.youtube.com/watch?v=bJms9YyjoBI",
      "https://image.shutterstock.com/image-vector/man-doing-knee-chest-lower-260nw-1991346713.jpg",
      "Lie on the floor with your legs extended. Lift your right knee up and grap it with both hands./n"
          "Pull your right knee towards your chest as much you can while keeping your left leg straight on the ground./n"
          "Hold this position for a few seconds,");
  static var wallCalfRaise = Exercise(
      "WALL CALF RAISE",
      "LEG",
      "https://www.youtube.com/watch?v=GQa_N7wft7M",
      "https://thumbs.dreamstime.com/z/straight-leg-calf-stretch-sport-exersice-silhouettes-woman-doing-exercise-workout-training-straight-leg-calf-stretch-sport-137440954.jpg",
      "Stand straight with your hands on the wall and feet shoulder width apart./n"
          "Lift your heels and stand on your toes.Then drop your heel down. Repeat the exercise.");
  static var sumoSquatCalfRaisesWithWall = Exercise(
      "SUMO SQUAT CALF RAISES WITH WALL",
      "LEG",
      "https://www.youtube.com/watch?v=Hcy81KUTIZ8",
      "https://www.spotebi.com/wp-content/uploads/2016/09/wall-sit-plie-calf-raise-exercise-illustration-spotebi.jpg",
      "Stand with your hands on the wall and your feet a little than shoulder width apart./n"
          "Lower your body until your thighs are parallel to the floor."
          "Lift your heels up and down.");
  static var calfStretchLeft = Exercise(
      "CALF STRETCH LEFT",
      "LEG",
      "https://www.youtube.com/watch?v=mJOGKTYUAzY",
      "https://thumbs.dreamstime.com/z/man-doing-straight-leg-calf-stretch-exercise-flat-vector-illustration-isolated-white-background-workout-character-set-man-doing-201412427.jpg",
      "Stand one big step away in front of a wall./n"
          "Step forwards with your right foot and push the wall with your hands./n"
          "Please make sure your left leg is fully extended and your can feel your left calf stretching. Hold this position for a few seconds.");
  static var calfStretchRight = Exercise(
      "CALF STRETCH RIGHT",
      "LEG",
      "https://www.youtube.com/watch?v=mJOGKTYUAzY",
      "https://thumbs.dreamstime.com/z/man-doing-straight-leg-calf-stretch-exercise-flat-vector-illustration-isolated-white-background-workout-character-set-man-doing-201412427.jpg",
      "Stand one big step away in front of a wall./n"
          "Step forwards with your left foot and push the wall with your hands./n"
          "Please make sure your left leg is fully extended and your can feel your right calf stretching. Hold this position for a few seconds.");

  //Shoulder & Back Exercise
  static var rhomboidPulls = Exercise(
      "RHOMBOID PULLS",
      "Shoulder&Back",
      "https://www.youtube.com/watch?v=DEyDbzSudEU",
      "https://1.bp.blogspot.com/-JoTyRLUIMXQ/Xte8d1WIJ3I/AAAAAAAAEZ0/Y72jzcHQvHYM3OWHK_N8-8_lP9iBguyrgCLcBGAsYHQ/s1600/rhomboid%2Bpulls.gif",
      "Stand with your feet shoulder width apart./n"
          "Raise your arms parallel to the ground, and bend your elbows."
          "Pull your elbows back and squeeze your shoulder blades./nRepeat this exercise.");
  static var sideLyingFloorStretchLeft = Exercise(
      "SIDE-LYING FLOOR STRETCH LEFT",
      "Shoulder&Back",
      "https://www.youtube.com/watch?v=DMlSdmsHEeI",
      "https://1.bp.blogspot.com/-mroQYgipY0w/Xte88j5mweI/AAAAAAAAEaA/"
          "C0F3lqChd-crQVWoql-kp1pf3_St2XOtACEwYBhgLKs0DAL1OcqxYos3CEqCgP2vuZeUYVA3D8UkS3SbuSUA4Nm4G0d2pFEWvFS7_8YrCzMes3pwlB5v9qjFf9eqcClRXhAx3vBD_"
          "t7z6PDzDOeZZ5z8CVa2lUdeg56LL6Ov4mU96O9XUF8T1rCGcio8dodKuTD-pKt47LQsrvi-UcWD1GGTURbpNRHW-ul6Y9wBaHOkaHsgW_HnLkWXM6QcUwgzl_pCMqtgthghSwu5gS8Dt53wvrHkEHTTm"
          "-YgTwQ13xi1mOI_zK03yoPhg-il1oqOJ04tWjJYGNbon6SiQtIww0sbkodXL1Izz_7mX8GrCP3R0jEYuBETr0jc33e7AyWcxqARauKIZ2kAI6ShmMxrq9wmoSNvp2q30doZdVFt5a9xOZjss8hl2IlEAYOQrA"
          "__4uvUSow7QHLRZ3XLC83N-9ANl6enTtw4V--sczKqAsN7DcQkmdr54ik-zO-u6EoOC8go3O5dMd3WXcCrxxOcdCyj3ZuCvHY_diBh4NvBn2sATw30vEYZpygIUuUH3JtQtLKXZA-2xtrr0L8aZphXd"
          "-wsoWUWBN7uJNBJpVkLFiiE88QrdbDCBOw_HvV0kHlx-3ZVAm3ic4qtT-zk2dpcw2_7e9gU/s1600/side%2Blying%2Bfloor%2Bstretch.jpg",
      "Lie on your right side with your right knee/n"
          "slightly bent in front of you and your left leg stretched behind the right leg./n"
          "Straighten your left arm over your head and gently pull on your left wrist to stretch the left side of your body./n"
          "Hold this position for a few seconds.");
  static var sideLyingFloorStretchRight = Exercise(
      "SIDE-LYING FLOOR STRETCH RIGHT",
      "Shoulder&Back",
      "https://www.youtube.com/watch?v=DMlSdmsHEeI",
      "https://1.bp.blogspot.com/-mroQYgipY0w/Xte88j5mweI/AAAAAAAAEaA/"
          "C0F3lqChd-crQVWoql-kp1pf3_St2XOtACEwYBhgLKs0DAL1OcqxYos3CEqCgP2vuZeUYVA3D8UkS3SbuSUA4Nm4G0d2pFEWvFS7_8YrCzMes3pwlB5v9qjFf9eqcClRXhAx3vBD_"
          "t7z6PDzDOeZZ5z8CVa2lUdeg56LL6Ov4mU96O9XUF8T1rCGcio8dodKuTD-pKt47LQsrvi-UcWD1GGTURbpNRHW-ul6Y9wBaHOkaHsgW_HnLkWXM6QcUwgzl_pCMqtgthghSwu5gS8Dt53wvrHkEHTTm"
          "-YgTwQ13xi1mOI_zK03yoPhg-il1oqOJ04tWjJYGNbon6SiQtIww0sbkodXL1Izz_7mX8GrCP3R0jEYuBETr0jc33e7AyWcxqARauKIZ2kAI6ShmMxrq9wmoSNvp2q30doZdVFt5a9xOZjss8hl2IlEAYOQrA"
          "__4uvUSow7QHLRZ3XLC83N-9ANl6enTtw4V--sczKqAsN7DcQkmdr54ik-zO-u6EoOC8go3O5dMd3WXcCrxxOcdCyj3ZuCvHY_diBh4NvBn2sATw30vEYZpygIUuUH3JtQtLKXZA-2xtrr0L8aZphXd"
          "-wsoWUWBN7uJNBJpVkLFiiE88QrdbDCBOw_HvV0kHlx-3ZVAm3ic4qtT-zk2dpcw2_7e9gU/s1600/side%2Blying%2Bfloor%2Bstretch.jpg",
      "Lie on your left side with your left knee/n"
          "slightly bent in front of you and your right leg stretched behind the left leg./n"
          "Straighten your right arm over your head and gently pull on your right wrist to stretch the right side of your body./n"
          "Hold this position for a few seconds.");
  static var armScissors = Exercise(
      "ARM SCISSORS",
      "Shoulder&Back",
      "https://www.youtube.com/watch?v=pFrJQ-MyL10",
      "http://doa.alaska.gov/drb/images/akCare/exercises/scissors.jpg",
      "Stand upright with your feet shoulder width apart./n"
          "Stretch your arms in front of you at shoulder height with one arm overlap the other in the shape of the letter X,"
          "and then spread them apart./n"
          "Switch arms, and repeat the exercise.");
  static var catCowPose = Exercise(
      "CAT COW POSE",
      "Shoulder&Back",
      "https://www.youtube.com/watch?v=w_UKcI1Ftn8",
      "https://st4.depositphotos.com/4293685/23584/v/1600/depositphotos_235847510-stock-illustration-woman-doing-cat-cow-workout.jpg",
      "Start on all fours with your knees under your butt and your hands directly under your shoulders./n"
          "Then take a breath and make your belly fall down, shoulders roll back and head come up towards the ceiling./n"
          "As you exhale, curve your back upward and let your head come down. Repeat the exercise./n"
          "Do it slowly with each step of this exercise.");
  static var proneTricepsPushUps = Exercise(
      "PRONE TRICEPS PUSH UPS", "Shoulder&Back",
      "https://www.youtube.com/watch?v=Rr43jMaoJ9g",
      "https://www.wikihow.com/images/thumb/4/4c/Do-a-Push-Up-Step-4-preview-Version-5.jpg/550px-nowatermark-Do-a-Push-Up-Step-4-preview-Version-5.jpg.webp",
      "Lie on your stomach with your hands underneath your shoulders and your elbows bent./n"
          "Slightly raise your chest up, and then go back to the start position./nRepeat this exercise.");
  static var reclinedRhomboidSqueezes = Exercise(
      "RECLINED RHOMBOID SQUEEZES", "Shoulder&Back",
      "https://www.youtube.com/watch?v=olv2Sv9DwmA",
      "https://1.bp.blogspot.com/-zao3tIXpXSk/Xte-HUL7NWI/AAAAAAAAEbA/yg8sekR6oh8NOrjY8hzgJzb8JVpsNlCQACEwYBhgLKs0DAL1OcqzNvw7mVJ9NaaYvuv2rH7X5O8-40gXp3oTwWgpfaykYpLgMoMH_4zSHiM8D601bKaYO6gx0imsCTlMk1pBE1w4Nes7z9eviPrhOd6xop90CdKY55QE5BR5ZL0MYPR7lRKBmQdJbASZmMzN4bH86MgjpHQXHr-ZMIvtfv3dTA4Gvnisae1LB-_APQ2FVfO9ZmRjstaAxy_S_cHE-GcZXhD_Wjb6hNT-U-P1gNij0JJrCE4w5XWhgyESS8Yc89yA6rHE5XToZnhg580tMpr8Its0ascmHE-gyUx3x_uKO92AaBw1zCSmkiWhIi_IYpDGOf-uXzrtwWvp3tXPwl3R4EkeyNBU3q1NKAbvPD5z_6Fd581gXnGf4WkQL5IBJx5czNPkVr5TKa5tozpzYtaQZoxPaBiIC5We9O693kmRQzhZqB4L46VmZIaIkt603QRX0GH4b9w6n5jUIDrWKADsE4rpx7lxRJQR_A3wTdpeSwpSwagiwGNRypKd0zbHxzBI8HC1FXDMe5imcSSw5vyaYivLEeOmGaNnxk1wKadJB3Aegc6yasbdPTPb8FLXzLJHlFZuf8wIjT2wXuXq5-keqm61gCxzO4HethH4wh4Tf9gU/s320/reclined%2Bromboid%2Bsqueeze.gif",
      "Sit with your knees bent. Slightly lean your upper body back./n"
          "Stretch your arms in front of you, then pull your elbows back to make your elbows at a 90 degree angle and squeeze your shoulder blades./n"
          "Repeat this exercise.");
  static var childPose = Exercise("CHILD'S POSE", "Shoulder&Back",
      "https://www.youtube.com/watch?v=DMwRPGMPB10",
      "https://thumbs.dreamstime.com/z/man-lying-child-pose-body-relaxation-man-lying-child-pose-body-relaxation-exercise-meditation-position-relax-156002582.jpg",
      "Start with your knees and hands on the floor. Put your hands a little forward, widen your knees and put your toes together./n"
          "Take a breath, then exhale and sit back. Try to make your butt touch your heels. Relax your elbows, make your forehead touch the floor"
          " adnh try to lower your chest close to the floor. Hold this position./n"
          "Keep your arms stretched forward as you sit back. Make sure there "
          "is enough space between your shoulders and ears during the exercise");

  static List<Exercise> listAbsBeginner = [
    jumpingJacks,
    abdominalCrunches,
    russianTwist,
    mountainClimper,
    heelTouch,
    legPraises,
    plank,
    cobraStretch,
    spineLumbarTwistStretchLeft,
    spineLumbarTwistStretchRight
  ];

  static List<Exercise> listChestBeginner = [
    jumpingJacks,
    inclinePushups,
    kneePushUps,
    pushUps,
    wideArmPushUps,
    inclinePushups,
    boxPushUps,
    wideArmPushUps,
    hinduPushUps,
    cobraStretch,
    chestStretch
  ];

  static List<Exercise> listArmBeginner = [
    armRaises,
    sideArmRaise,
    tricepsDips,
    armCirclesClockwise,
    armCirclesCounterClockwise,
    diamondPushUps,
    jumpingJacks,
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
    spineLumbarTwistStretchRight
  ];

  static List<Exercise> listLegBeginner = [
    sideHop,
    squats,
    squats,
    sideLyingLegLiftLeft,
    sideLyingLegLiftRight,
    sideLyingLegLiftLeft,
    sideLyingLegLiftRight,
    backwardLunge,
    backwardLunge,
    donkeyKicksLeft,
    donkeyKicksRight,
    donkeyKicksLeft,
    donkeyKicksRight,
    leftQuadStretchWithWall,
    rightQuadStretchWithWall,
    kneeToChestStretchLeft,
    kneeToChestStretchRight,
    wallCalfRaise,
    wallCalfRaise,
    sumoSquatCalfRaisesWithWall,
    sumoSquatCalfRaisesWithWall,
    calfStretchLeft,
    calfStretchRight
  ];

  static List<Exercise> listShoulderAndBackBeginner = [
    jumpingJacks,
    armRaises,
    rhomboidPulls,
    sideArmRaise,
    kneePushUps,
    sideLyingFloorStretchLeft,
    sideLyingFloorStretchRight,
    armScissors,
    rhomboidPulls,
    sideArmRaise,
    kneePushUps,
    catCowPose,
    proneTricepsPushUps,
    reclinedRhomboidSqueezes,
    proneTricepsPushUps,
    reclinedRhomboidSqueezes,
    childPose,
  ];
}
