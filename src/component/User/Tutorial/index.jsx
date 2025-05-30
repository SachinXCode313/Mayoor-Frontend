import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import "./style.css";

const Tutorial = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tourRef = useRef(null);
  const overlayRef = useRef(null);
  const isAutoRunDoneRef = useRef(false);

  // Global Overlay Helpers
  const addOverlay = () => {
    if (overlayRef.current && !document.body.contains(overlayRef.current)) {
      document.body.appendChild(overlayRef.current);
    }
  };

  const removeOverlay = () => {
    const el = document.querySelector('.tutorial-overlay');
    if (el) el.remove();
    overlayRef.current = null;
  };
  

  const createTour = () => {
    const overlay = document.createElement("div");
    overlay.classList.add("tutorial-overlay");
    overlayRef.current = overlay;

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: "shepherd-theme-custom",
        scrollTo: true,
        arrow: true,
        when: {
          show: () => {
            if (!document.body.contains(overlayRef.current)) {
              addOverlay();
            }
            document
              .querySelector(".shepherd-modal-overlay-container")
              ?.scrollIntoView({ behavior: "smooth" });
          },
        },
      },
    });

    // Ensure overlay is removed on cancel/complete
    tour.on("cancel", () => {
      removeOverlay();
      localStorage.setItem("tutorialSeen", "true");
    });

    const skipButton = {
      text: "Skip",
      action: () => {
        removeOverlay();
        localStorage.setItem("tutorialSeen", "true");
        tour.cancel();
        tourRef.current = null; 
      },
      classes: "shepherd-button-secondary",
    };

    const nextButton = (navigateTo, stepIndex = null) => ({
      text: "Next",
      action: () => {
        tour.hide();
        if (navigateTo) {
          navigate(navigateTo);
          const checkAndShowStep = () => {
            const elementNeeded =
              tour.steps[stepIndex ?? tour.currentStep.index + 1]?.options?.attachTo?.element;
            const el = document.querySelector(elementNeeded);
            if (el) {
              if (stepIndex !== null) {
                tour.show(stepIndex);
              } else {
                tour.next();
              }
            } else {
              setTimeout(checkAndShowStep, 200);
            }
          };
          setTimeout(checkAndShowStep, 500);
        } else {
          tour.next();
        }
      },
    });

    const backButton = (navigateTo, stepIndex = null) => ({
      text: "Back",
      action: () => {
        tour.hide();
        if (navigateTo) {
          navigate(navigateTo);
          const checkAndShowStep = () => {
            const elementNeeded =
              tour.steps[stepIndex ?? tour.currentStep.index - 1]?.options?.attachTo?.element;
            const el = document.querySelector(elementNeeded);
            if (el) {
              if (stepIndex !== null) {
                tour.show(stepIndex);
              } else {
                tour.back();
              }
            } else {
              setTimeout(checkAndShowStep, 200);
            }
          };
          setTimeout(checkAndShowStep, 500);
        } else {
          tour.back();
        }
      },
    });

    // Tour steps
    tour.addStep({
      id: "homelist",
      text: "Select a choice before proceeding.",
      attachTo: { element: ".choice", on: "bottom" },
      buttons: [skipButton, nextButton("/user/home/classview")],
    });

    tour.addStep({
      id: "classoverview",
      text: "This is the class overview page.",
      attachTo: { element: ".class-overview", on: "bottom" },
      buttons: [skipButton, backButton("/user/homelist", 0), nextButton("/user/home/students")],
    });

    tour.addStep({
      id: "students",
      text: "This is the Student page. Here, you can view the list of students.",
      attachTo: { element: ".studentlist", on: "bottom" },
      buttons: [skipButton, nextButton()],
    });

    tour.addStep({
      id: "student-report",
      text: "Click on a student to view their report.",
      attachTo: { element: ".student-item", on: "bottom" },
      buttons: [skipButton, backButton(null), nextButton("/user/home/ro")],
    });

    tour.addStep({
      id: "ro",
      text: "This is the RO list where RO and LO mapping has to be done.",
      attachTo: { element: ".ro-list", on: "bottom" },
      buttons: [skipButton, nextButton()],
    });

    tour.addStep({
      id: "ro-mapping",
      text: "Click on an RO to open the dropdown and map LOs.",
      attachTo: { element: ".ro-item:first-child", on: "bottom" },
      buttons: [skipButton, backButton(null), nextButton("/user/home/lo")],
    });

    tour.addStep({
      id: "create-lo",
      text: "Click here to create a new Learning Outcome (LO).",
      attachTo: { element: ".create-lo-button", on: "bottom" },
      buttons: [skipButton, backButton(null), nextButton()],
    });

    tour.addStep({
      id: "lo",
      text: "This is the LO list where LO and AC mapping has to be done.",
      attachTo: { element: ".lo-list", on: "bottom" },
      buttons: [skipButton, nextButton()],
    });

    tour.addStep({
      id: "lo-mapping",
      text: "Click on an LO to open the dropdown and map ACs.",
      attachTo: { element: ".lo-item:first-child", on: "bottom" },
      buttons: [skipButton, backButton(null), nextButton("/user/home/ac", 10)],
    });

    tour.addStep({
      id: "create-ac",
      text: "Click here to create a new Assessment Criteria (AC).",
      attachTo: { element: ".create-ac-button", on: "bottom" },
      buttons: [skipButton, backButton(null), nextButton()],
    });

    tour.addStep({
      id: "ac",
      text: "These are the ACs. On tapping, it will open the Start Assessment page.",
      attachTo: { element: ".ac-list", on: "bottom" },
      buttons: [
        skipButton,
        {
          text: "Finish",
          action: () => {
            removeOverlay();
            localStorage.setItem("tutorialSeen", "true");
            tour.cancel();
            tourRef.current = null; 
            document.querySelectorAll(".shepherd-element").forEach(el => el.remove());
            document.querySelectorAll(".shepherd-modal-overlay-container").forEach(el => el.remove());
          },
          classes: "shepherd-button-secondary",
        },
        
      ]  
    });

    tourRef.current = tour;
  };

  const routeStepMap = {
    "/user/homelist": 0,
    "/user/home/classview": 1,
    "/user/home/students": 2,
    "/user/home/ro": 4,
    "/user/home/lo": 6,
    "/user/home/ac": 10,
  };

  useEffect(() => {
    return () => {
      removeOverlay();
    };
  }, [location]);

  
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("tutorialSeen");

    if (!hasSeenTutorial && !isAutoRunDoneRef.current) {
      isAutoRunDoneRef.current = true;
      createTour();
      const stepToStart = routeStepMap[location.pathname];
      if (stepToStart !== undefined) {
        setTimeout(() => {
          tourRef.current.start();
          tourRef.current.show(stepToStart);
        }, 500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual trigger (e.g., from a menu)
  useImperativeHandle(ref, () => ({
    startTutorial: () => {
      localStorage.removeItem("tutorialSeen");
      if (tourRef.current) {
        tourRef.current.cancel();
        tourRef.current = null;
      }

      createTour();
      navigate("/user/homelist");

      setTimeout(() => {
        tourRef.current.start();
        tourRef.current.show(0);
      }, 600);
    },
  }));

  return null;
});

export default Tutorial;