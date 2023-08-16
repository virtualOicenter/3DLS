# This project was created by the Education Labaratory Lab of Tel-Hai Excellence and Innovation Unit.

# database structure:
github (vitualOicenter/3DModels) stores the 3dmodels which then are used via jsdelivr as cdn`s.
TODO: host the 3d models in another storing solution.

# components sturucture for each user:

#   Student
    App-> ExcerciseViewer-> (1) ActivityPage || (2) QuizPage -> (3) ModelViewer && (4) instructionScreen || (5) QuestionsScreen

    (1) ActivityPage: Main component to display the page for activities that are not DND quizzez.
        The page consists of (4) instructions, which change to (5) questionsScreen when hotspots is clicked.
        At the bottom of the screen there is a ModelViewer component. This components gets some state parameters that are used to control the parent ActicityPage Component.

    (2) QuizPage: Main component to display DND quiz activity- Similar to ActivityPage. Main difference in structure is a start button that changes the         
        Instruction to the (5) QuestionsScreen. In contrary to ActivityPage, in DND quiz questionsScreen is the Draggable Titles which are to be dragged by the student to the correct hotspot on the model.

#   Content Creator
    App->contentCreatorDashBoard->(6) ExerciseCard->(7) excerciseDefinition
    (6) The exerciseCard displays buttons with actions depending on isPublished boolean property of the exercise. 
        If isPublished == true then the buttons open the exercise in a new tab or copy the embed iframe code to embed in MOODLE or any other iframe.
        If isPublished == false then the buttons aloow editing the exercise definition (Component No. 7)  or publish the exercise.
    
    (7) The exerciseDefinition
        