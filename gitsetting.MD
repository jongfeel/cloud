## git github 설정
  - github 가입
  - git 설치 
  
## git bash 앱에서 하단과 같이 아이디와 이메일 입력 

![_1](https://user-images.githubusercontent.com/13567708/41658854-ac31240e-74d2-11e8-8f19-302f307055cb.png)


## 온라인 저장소 만들기
  - 프로젝트가 거주할 공간 만들기 > github 페이지 > new repository page > public 설정 후 생성
  
![2](https://user-images.githubusercontent.com/13567708/41658858-adeb303c-74d2-11e8-83a0-96862542e9a3.png)


## 로컬 저장소 만들기
  - 위에서는 온라인 상의 프로젝트 공간 / 로컬 디렉토리에 저장소 생성 > 디렉토리를 만들고 git init 명령어로
    git 저장소 명시
    
![3](https://user-images.githubusercontent.com/13567708/41658861-b02dc490-74d2-11e8-8a1a-1aff98d5ace7.png)

## 로컬저장소와 깃허브 저장소 연결
   - cloud 라는 저장소에 git init 명령어로 git 저장소 명시
   - 로컬저장소와 깃허브 저장소를 연결하기 위해 깃에게 온라인 어딘가가 실제 원격(remote) 저장소인지를 알려주어야 함
   - 간단히 말하자면 온라인에 있는 상단의 저장소를 origin 으로 지정 > 원격저장소가 있는 곳과 로컬저장소가 변경사항을 어디로 보낼지 알수 있게 됨
   - 확인을 위해 하단 코드를 입력
      git remote -v  >  이 명령어는 로컬 저장소가 알고 있는 원격 origin 에 대한 모든 항목을 보여줌
![111](https://user-images.githubusercontent.com/13567708/41658991-0ab6616a-74d3-11e8-9eba-ccfbf01a4038.png)


## 깃허브 원격저장소로 변경사항 업로드 
![1](https://user-images.githubusercontent.com/13567708/41658992-0ae4c28a-74d3-11e8-8e3a-d2fdf0460474.png)
    - 파일을 새로 생성한 후, git status 명령을 실행하면 untracked 파일을 보여줍니다. 
      아직 스냅샷(commit)에 넣어지지 않은 파일이라고 보고 파일이 tracked 상태가 되기 전까지 
      gitdms 절대 해당 파일을 commit 하지 않습니다.  
      - 그렇기 때문에 git add 명령어로 직접 tracked 상태로 만들어 해당 파일을 추적하게 만드는 겁니다. 
      git add를 한 후 git status 명령을 다시 실행하면 해당 파일이 tracked 상태이면서 staged 상태라는 것을 확인할 수 있습니다.
      
      
![2](https://user-images.githubusercontent.com/13567708/41658993-0b14311e-74d3-11e8-9ba5-95dac6c10c77.png)

   - 수정한 것을 commit 하기 위해 staging area에 파일을 정리했습니다. 
     unstaged 상태의 파일은 commit 되지 않습니다.  

   - git 은 생성 혹은 수정 후의 git add 명령으로 추가하지 않은 파일은 commit 하지 않습니다. 
     그 파일은 여전히 modified 상태로 남아 있게 됩니다. 

   - git commit -m "변경된 메시지 내용" 
     ( * 변경된 메시지 내용을 적어주지 않으면 vim 내장 편집기 가 실행됩니다. )  

   - git 에서 commit은 변경사항을 내컴퓨터에 저장한다는 의미입니다. 
     위 명령어를 실행하면 작업흐름상에 변경된 파일이 head에 반영될 것입니다. 
     하지만 원격저장소에는 아직 반영되지 않습니다.  

   - git push 변경된 내용 발행하기 
     push는 마지막으로 commit한 사항을 git repository에 올리겠다는 뜻입니다. 
     push가 안되면 원격 서버에 변경사항이 저장되지 않습니다. 
     다시말해서, 프로젝트를 공유하고 싶을 때 remote저장소에 push 할 수 있습니다. 
     commit 까지 실행했다면 현재의 변경 내용은 아직 로컬저장소의 head에 머물고 있을 것입니다. 

     이제 이 변경내용을 원격서버로 올리기 위해 아래 명령을 실행합니다.  
     git push -u origin master 

     위 명령어 중 origin과 master는 각각 remote저장소와 branch를 의미합니다.  
     -u는 remote저장소로부터 업데이트를 받은 후, push를 한다는 의미이므로 습관적으로 -u 사용을 권장합니다. 
     그 이유는 clone한 사람이 여러 명 있을 경우, 다른 사람이 push 한 후에 push 하려고 하면 할 수 없기 때문에 
     먼저 다른 사람이 작업한 것을 가져와서 merge 한 후에 push 할 수 있습니다.
