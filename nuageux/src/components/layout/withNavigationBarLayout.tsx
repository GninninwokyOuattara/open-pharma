import { ComponentType, ReactNode } from 'react';
import NavigationBar from '../navigation/NavigationBar';


interface INavigationBarWrappedLayout {
  children: ReactNode
}




const withNavigationBarLayout = <T extends INavigationBarWrappedLayout>(
  WrappedComponent: ComponentType<T>
) => (props: T): JSX.Element => (
  <div className='w-full flex flex-col'>
    <NavigationBar />
    <WrappedComponent {...props} />
  </div>
);


export default withNavigationBarLayout