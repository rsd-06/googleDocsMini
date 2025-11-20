import { Editor } from "./editor";
import { ToolBar } from './toolbar';
import { Navbar } from "./navbar";

interface DocumentPageProps {
    params : Promise<{ documentId: string }>;
};



const DocumentPage = async ({ params } :DocumentPageProps) => {
    
    const { documentId } = await params;
    
    return (  
        <>
            <div className="min-h-screen bg-[#FAFBFD]">
                < Navbar />
                < ToolBar />
                < Editor />
            </div>
        </>     
    );
};

export default DocumentPage;