//
//  ReadyRemitViewController.m
//  ReactNativeSampleApp
//
//  Created by Lucas Araujo on 29/10/24.
//

#import "ReadyRemitViewController.h"

//ReadyRemitSDK
#import "ReadyRemitSDK/ReadyRemitSDK.h"

@interface ReadyRemitViewController ()

@property (weak, nonatomic) ReadyRemit* readyRemit;
@property (nonatomic, copy) void (^launchCompletion)(void);
@property (nonatomic, copy) void (^onDismiss)(void);

@end

@implementation ReadyRemitViewController

- (void) viewDidLoad {
  [super viewDidLoad];
  
  _launchCompletion = ^{ NSLog(@"ObjC: ReadyRemit launched."); };
    _onDismiss = ^{
      [[self delegate] onSDKClose];
      [[self navigationController] dismissViewControllerAnimated:YES completion:nil];
    };
  
  _readyRemit = [ReadyRemit shared];
    
  _readyRemit.appearance = _appearance;
  _readyRemit.environment = _environment;
  [_readyRemit languageSelected:_language];
  
  [_readyRemit launchObjcInNavigation:[self navigationController]
                             delegate: _delegate
                             onLaunch: _launchCompletion
                             onDismiss: _onDismiss];
}

@end
