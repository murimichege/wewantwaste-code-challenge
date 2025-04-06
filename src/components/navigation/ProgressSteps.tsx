import React from "react";
import { MapPin, Trash2, Box, ClipboardCheck, Calendar, CreditCard, Check } from "lucide-react";

type ProgressStepId = "postcode" | "waste-type" | "select-skip" | "permit-check" | "choose-date" | "payment";

export interface ProgressStepsProps {
  currentStep: ProgressStepId;
  variant?: "default" | "minimal" | "numbered";
  size?: "sm" | "md" | "lg";
  onStepClick?: (stepId: ProgressStepId) => void;
  allowNavigation?: boolean;
  orientation?: "horizontal" | "vertical";
}

const stepConfig = {
  postcode: {
    label: "Postcode",
    icon: MapPin,
    description: "Enter your delivery location"
  },
  "waste-type": {
    label: "Waste Type",
    icon: Trash2,
    description: "Select the type of waste"
  },
  "select-skip": {
    label: "Select Skip",
    icon: Box,
    description: "Choose the right skip size"
  },
  "permit-check": {
    label: "Permit Check",
    icon: ClipboardCheck,
    description: "Verify any required permits"
  },
  "choose-date": {
    label: "Choose Date",
    icon: Calendar,
    description: "Select delivery date"
  },
  payment: {
    label: "Payment",
    icon: CreditCard,
    description: "Complete your payment"
  }
};

export function ProgressSteps({
  currentStep,
  variant = "default",
  size = "md",
  onStepClick,
  allowNavigation = false,
  orientation = "horizontal"
}: ProgressStepsProps) {
  const stepIds = Object.keys(stepConfig) as ProgressStepId[];
  const currentStepIndex = stepIds.findIndex((id) => id === currentStep);
  
  // Determine sizes based on the size prop
  const sizeClasses = {
    sm: {
      container: "py-2",
      icon: "h-4 w-4",
      iconContainer: "p-1",
      text: "text-xs",
      line: "h-0.5",
      verticalLine: "w-0.5"
    },
    md: {
      container: "py-4",
      icon: "h-5 w-5",
      iconContainer: "p-2",
      text: "text-sm",
      line: "h-0.5",
      verticalLine: "w-0.5"
    },
    lg: {
      container: "py-6",
      icon: "h-6 w-6",
      iconContainer: "p-3",
      text: "text-base",
      line: "h-1",
      verticalLine: "w-1"
    }
  };
  
  const getSizes = sizeClasses[size];
  
  const renderStepIcon = (step: ProgressStepId, index: number, isCompleted: boolean, isActive: boolean) => {
    const StepIcon = stepConfig[step].icon;
    
    if (variant === "numbered") {
      return (
        <div 
          className={`flex items-center justify-center rounded-full transition-colors duration-200
            ${isCompleted 
              ? "bg-green-600 text-white" 
              : isActive 
                ? "bg-blue-600 text-white" 
                : "bg-gray-700 text-gray-400"
            } ${getSizes.iconContainer}`}
          aria-hidden="true"
        >
          {isCompleted ? (
            <Check className={getSizes.icon} />
          ) : (
            <span className={getSizes.text}>{index + 1}</span>
          )}
        </div>
      );
    }
    
    return (
      <div 
        className={`rounded-full transition-colors duration-200
          ${isCompleted 
            ? "bg-green-600" 
            : isActive 
              ? "bg-blue-600" 
              : "bg-gray-700"
          } ${getSizes.iconContainer}`}
        aria-hidden="true"
      >
        <StepIcon className={getSizes.icon} />
      </div>
    );
  };

  const renderHorizontalStepper = () => (
    <>
      <div className="hidden md:flex justify-between items-center">
        {stepIds.map((stepId, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const step = stepConfig[stepId];
          const isClickable = allowNavigation && (isCompleted || index === currentStepIndex + 1);
          
          return (
            <div 
              key={stepId} 
              className={`flex flex-col items-center relative ${isClickable ? "cursor-pointer" : "cursor-default"}`}
              onClick={() => isClickable && onStepClick?.(stepId)}
              role={isClickable ? "button" : "presentation"}
              tabIndex={isClickable ? 0 : -1}
              aria-current={isActive ? "step" : undefined}
            >
              {/* Step Icon */}
              {renderStepIcon(stepId, index, isCompleted, isActive)}

              {/* Step Label */}
              <span 
                className={`${getSizes.text} mt-1 font-medium
                  ${isActive ? "text-blue-500" : isCompleted ? "text-green-500" : "text-gray-500"}`}
              >
                {step.label}
              </span>
              
              {/* Step Description (for minimal variant, hide description) */}
              {variant !== "minimal" && (
                <span className={`${getSizes.text} text-gray-400 text-center max-w-[120px] mt-0.5`}>
                  {step.description}
                </span>
              )}

              {/* Connector Line */}
              {index < stepIds.length - 1 && (
                <div
                  className={`absolute ${getSizes.line} transition-colors duration-300
                    ${isCompleted ? "bg-green-600" : "bg-gray-700"}`}
                  style={{
                    width: "calc(100% - 30px)",
                    left: "calc(50% + 15px)",
                    top: getSizes.iconContainer === "p-1" ? "12px" : 
                         getSizes.iconContainer === "p-2" ? "20px" : "28px",
                    zIndex: -1,
                  }}
                  aria-hidden="true"
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Progress Indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className={`${getSizes.text} text-gray-400`}>
            Step {currentStepIndex + 1} of {stepIds.length}
          </span>
          <span className={`${getSizes.text} font-medium text-blue-500`}>
            {stepConfig[currentStep].label}
          </span>
        </div>
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentStepIndex + 1) / stepIds.length) * 100}%`,
            }}
            aria-hidden="true"
          />
        </div>
        
        {/* Current step description on mobile */}
        {variant !== "minimal" && (
          <p className={`${getSizes.text} text-gray-400 mt-2`}>
            {stepConfig[currentStep].description}
          </p>
        )}
      </div>
    </>
  );
  
  const renderVerticalStepper = () => (
    <div className="flex flex-col">
      {stepIds.map((stepId, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;
        const step = stepConfig[stepId];
        const isClickable = allowNavigation && (isCompleted || index === currentStepIndex + 1);
        const isLast = index === stepIds.length - 1;
        
        return (
          <div 
            key={stepId}
            className={`flex items-start relative ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            onClick={() => isClickable && onStepClick?.(stepId)}
            role={isClickable ? "button" : "presentation"}
            tabIndex={isClickable ? 0 : -1}
            aria-current={isActive ? "step" : undefined}
          >
            {/* Left side with icon and connector */}
            <div className="flex flex-col items-center mr-4">
              {renderStepIcon(stepId, index, isCompleted, isActive)}
              
              {/* Vertical connector */}
              {!isLast && (
                <div 
                  className={`${getSizes.verticalLine} flex-grow my-1 transition-colors duration-300
                    ${isCompleted ? "bg-green-600" : "bg-gray-700"}`}
                  style={{ height: variant === "minimal" ? "24px" : "40px" }}
                  aria-hidden="true"
                ></div>
              )}
            </div>
            
            {/* Right side with text */}
            <div className={`flex flex-col py-1 ${isLast ? "" : "mb-2"}`}>
              <span 
                className={`${getSizes.text} font-medium
                  ${isActive ? "text-blue-500" : isCompleted ? "text-green-500" : "text-gray-500"}`}
              >
                {step.label}
              </span>
              
              {/* Step Description (for minimal variant, hide description) */}
              {variant !== "minimal" && (
                <span className={`${getSizes.text} text-gray-400 mt-0.5`}>
                  {step.description}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`sticky top-0 z-50 bg-[#0a0a0a] border-b border-gray-800 ${getSizes.container}`}>
      <div className="container mx-auto px-4">
        {orientation === "horizontal" ? renderHorizontalStepper() : renderVerticalStepper()}
      </div>
    </div>
  );
}