const LandingLayout = ({ children }: {children: React.ReactNode;}) => {
    return (
        <main className="h-full bg-gray overflow-auto">
            <div>
                {children}
            </div>
        </main>
    );
}
 
export default LandingLayout;