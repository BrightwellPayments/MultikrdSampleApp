//
//  ReadyRemitViewController.h
//  ReactNativeSampleApp
//
//  Created by Lucas Araujo on 29/10/24.
//

#import <UIKit/UIkit.h>

//ReadyRemitSDK
#import "ReadyRemitSDK/ReadyRemitSDK.h"

@interface ReadyRemitViewController : UIViewController
@property (nonatomic, assign) id<ReadyRemitDelegate> delegate;
@property (nonatomic, assign) NSString* language;
@property (nonatomic, assign) ReadyRemitEnvironment environment;
@property (nonatomic, strong) ReadyRemitAppearance* appearance;
@end
