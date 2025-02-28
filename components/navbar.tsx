import useSWR from 'swr';
import { createElement, ReactNode, useCallback, useMemo } from 'react';
import { CircularProgress, Link } from '@mui/material';
import { useRouter } from 'next/router';
import * as MuiIcons from '@mui/icons-material';
import { RouterData } from '../pages/api/routes';
import fetcherGenerator from '../fetcher-generator';

const fetcher = fetcherGenerator<RouterData>();

const Navbar = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: routes, error } = useSWR('/api/routes', fetcher);

    const router = useRouter();
    const { asPath: path } = router;

    const RootNavbar = useCallback(
        ({ children }: { children?: ReactNode }) => (
            <div className="flex flex-row w-screen bg-fuchsia-500 min-h-[7.5vh] flex-shrink">
                {children}
            </div>
        ),
        []
    );

    const routeDivs = useMemo(() => {
        if (!routes) {
            return [];
        }
        return routes
            .map((route, idx) => {
                const { uri, name, icon, visible } = route;

                if (visible === false) {
                    return null;
                }

                return (
                    <Link
                        key={uri}
                        className={`flex flex-1 flex-grow no-underline hover:no-underline border-gray-600 ${
                            idx > 0 ? 'border-l-[0.1vw] ' : ' '
                        }${idx < routes.length - 1 ? 'border-r-[0.1vw]' : ' '}`}
                        href={uri}
                    >
                        <div
                            className={`flex flex-1 flex-col flex-grow ${
                                uri === path ? 'text-[93C5FD]' : 'text-white'
                            }`}
                        >
                            {icon && (
                                <div className="mx-auto my-auto flex flex-[2_2_0%]">
                                    {createElement(MuiIcons[icon], {
                                        className:
                                            'flex-1 my-auto text-3xl md:text-4xl lg:text-5xl'
                                    })}
                                </div>
                            )}
                            <div className="mx-auto my-auto flex-1 text-base md:text-lg lg:text-xl flex">
                                <div className="flex-1 flex-shrink my-auto text-center">
                                    {name}
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })
            .filter((e) => e);
    }, [routes, path]);

    if (error) {
        return (
            <RootNavbar>
                <div>API 로딩에 실패했습니다.</div>
            </RootNavbar>
        );
    }

    if (!routes) {
        return (
            <RootNavbar>
                <div className="flex flex-1 flex-grow">
                    <CircularProgress
                        className="white mx-auto my-auto"
                        sx={{
                            color: 'white'
                        }}
                    />
                </div>
            </RootNavbar>
        );
    }

    return <RootNavbar>{routeDivs}</RootNavbar>;
};

export default Navbar;
