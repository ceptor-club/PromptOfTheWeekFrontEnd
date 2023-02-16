import { CLIENT_STATIC_FILES_RUNTIME_AMP } from "next/dist/shared/lib/constants";

const AdvancedButton = ({ advanced, setAdvanced }) => {
    return (
        <div
            className="flex items-center justify-center bg-blue-400 p-0 cursor-pointer"

        >
            <p
                onClick={() => setAdvanced(!advanced)}
            >Click for Advanced Prompt Editing</p>
        </div>
    )
}

export default AdvancedButton;