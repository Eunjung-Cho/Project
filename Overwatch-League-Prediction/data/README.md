# 오버워치 리그 예측 데이터
- match_map_stats : 경기 결과 데이터에 대한 데이터 (라운드 승패 및 경기 승패에 관한 데이터)

## 최종 예측에 사용한 데이터
- **phs_p** : 2018~2021년에 걸친 플레이어 데이터, 포지션별로 분류가 되어있는 feature가 있다.
![image](https://user-images.githubusercontent.com/59313007/121768309-94644980-cb98-11eb-8d1a-671289c453db.png)

- **승패여부**: match_id,	map_name,	team	win 가 join key로 사용이되는 승패여부가 적혀있는 데이터. phs_p에 승패를 라벨링하기 위해 필요함
![image](https://user-images.githubusercontent.com/59313007/121768357-d1304080-cb98-11eb-9593-f50624cbcc34.png)
